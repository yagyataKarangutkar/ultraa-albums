import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/**
 * PixelMosaicTransition — Canvas-based pixel-mosaic dissolve/reveal.
 *
 * Draws the incoming hero image as a grid of tiles that fade+scale in with a
 * directional stagger wave. Once every tile is fully revealed the canvas is
 * removed and the underlying <img> (rendered by Hero) takes over at full
 * sharpness.
 *
 * The component renders a single <canvas> element that covers the hero
 * viewport. All per-frame work runs inside a GSAP timeline → rAF loop,
 * keeping React out of the hot path entirely.
 *
 * Props:
 *   incomingSrc   – URL of the next hero image (already preloaded)
 *   focalPoint    – CSS object-position string, e.g. "center 40%"
 *   pattern       – 0..3 reveal-wave index
 *   onComplete    – callback when the mosaic has fully resolved
 *   reducedMotion – skip the effect entirely
 */

// ─── Grid sizing ────────────────────────────────────────────────────────────
const COLS_DESKTOP = 30;
const COLS_MOBILE = 18;
const TRANSITION_DURATION = 1.3; // seconds for the full mosaic
const TILE_DURATION = 0.55;      // each tile's own reveal duration
const STAGGER_SPREAD = 0.5;     // total time spread across the stagger

function getColCount() {
  if (typeof window === 'undefined') return COLS_DESKTOP;
  return window.innerWidth < 768 ? COLS_MOBILE : COLS_DESKTOP;
}

// ─── Stagger patterns ──────────────────────────────────────────────────────
function centerOutDelay(col, row, cols, rows) {
  const cx = (cols - 1) / 2;
  const cy = (rows - 1) / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);
  const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
  return (dist / maxDist) * STAGGER_SPREAD;
}

function leftToRightDelay(col, _row, cols) {
  return (col / (cols - 1)) * STAGGER_SPREAD;
}

function diagonalDelay(col, row, cols, rows) {
  const maxSum = cols + rows - 2;
  return ((col + row) / maxSum) * STAGGER_SPREAD;
}

function seededScatterDelay(col, row, cols) {
  // Deterministic pseudo-random based on position
  const seed = (col * 7 + row * 13 + col * row * 3) % 100;
  return (seed / 100) * STAGGER_SPREAD;
}

const PATTERNS = [centerOutDelay, leftToRightDelay, diagonalDelay, seededScatterDelay];

// ─── Focal-point parser ─────────────────────────────────────────────────────
function parseFocalPoint(fp) {
  if (!fp) return { x: 0.5, y: 0.5 };
  const parts = fp.split(/\s+/);
  const parse = (v) => {
    if (v === 'center') return 0.5;
    if (v === 'left' || v === 'top') return 0;
    if (v === 'right' || v === 'bottom') return 1;
    if (v.endsWith('%')) return parseFloat(v) / 100;
    return 0.5;
  };
  return {
    x: parse(parts[0] || 'center'),
    y: parse(parts[1] || 'center'),
  };
}

// ─── Cover-fit math (replicating CSS object-fit:cover) ──────────────────────
function coverFit(imgW, imgH, canvasW, canvasH, focalX, focalY) {
  const scale = Math.max(canvasW / imgW, canvasH / imgH);
  const scaledW = imgW * scale;
  const scaledH = imgH * scale;
  const offsetX = (canvasW - scaledW) * focalX;
  const offsetY = (canvasH - scaledH) * focalY;
  return { scaledW, scaledH, offsetX, offsetY };
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function PixelMosaicTransition({
  incomingSrc,
  focalPoint = 'center center',
  pattern = 0,
  onComplete,
  reducedMotion = false,
}) {
  const canvasRef = useRef(null);
  const tlRef = useRef(null);
  const rafRef = useRef(null);
  const completedRef = useRef(false);

  const cleanup = useCallback(() => {
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!incomingSrc || reducedMotion) {
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      onComplete?.();
      return;
    }

    completedRef.current = false;

    // Size the canvas to the hero's pixel dimensions (device-pixel aware)
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× for perf
    const cW = Math.round(rect.width * dpr);
    const cH = Math.round(rect.height * dpr);
    canvas.width = cW;
    canvas.height = cH;

    // Build the tile grid
    const cols = getColCount();
    const tileW = cW / cols;
    const rows = Math.max(1, Math.round(cH / tileW)); // keep tiles ~square
    const tileH = cH / rows;

    const patternFn = PATTERNS[pattern % PATTERNS.length];
    const fp = parseFocalPoint(focalPoint);

    // Create tile state objects
    const tiles = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        tiles.push({
          col: c,
          row: r,
          progress: 0, // 0 → 1
          delay: patternFn(c, r, cols, rows),
        });
      }
    }

    // Load the incoming image (should already be cached/preloaded)
    const img = new Image();
    if (incomingSrc.startsWith('http')) {
      img.crossOrigin = 'anonymous';
    }
    img.src = incomingSrc;

    // Fail-safe timeout so transitions never hang or lock state
    const fallbackTimer = setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }, (TRANSITION_DURATION + 0.4) * 1000);

    const startAnimation = () => {
      const { scaledW, scaledH, offsetX, offsetY } = coverFit(
        img.naturalWidth,
        img.naturalHeight,
        cW,
        cH,
        fp.x,
        fp.y
      );

      // Build a GSAP timeline that tweens each tile's `progress` 0→1
      const tl = gsap.timeline({
        onComplete: () => {
          if (!completedRef.current) {
            completedRef.current = true;
            // Final full-res draw then signal completion
            ctx.clearRect(0, 0, cW, cH);
            ctx.globalAlpha = 1;
            ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
            onComplete?.();
          }
        },
      });

      tiles.forEach((tile) => {
        tl.to(
          tile,
          {
            progress: 1,
            duration: TILE_DURATION,
            ease: 'power3.out',
          },
          tile.delay // position in the timeline = tile's stagger delay
        );
      });

      tlRef.current = tl;

      // rAF render loop — draws the canvas every frame while the timeline is active
      const render = () => {
        if (completedRef.current) return;

        ctx.clearRect(0, 0, cW, cH);

        for (let i = 0; i < tiles.length; i++) {
          const t = tiles[i];
          if (t.progress <= 0) continue;

          const p = t.progress;
          const x = t.col * tileW;
          const y = t.row * tileH;
          const w = Math.ceil(tileW) + 1; // +1 to seal sub-pixel seams
          const h = Math.ceil(tileH) + 1;

          // Scale: starts at 0.85, ends at 1.0
          const tileScale = 0.85 + 0.15 * p;
          // Opacity: smooth ramp
          const alpha = p;

          ctx.save();

          // Translate to tile center, apply scale, translate back
          const cx = x + w / 2;
          const cy = y + h / 2;
          ctx.translate(cx, cy);
          ctx.scale(tileScale, tileScale);
          ctx.translate(-cx, -cy);

          ctx.globalAlpha = alpha;

          // Draw only this tile's slice of the full image
          // Source rect on the original image
          const srcX = (x - offsetX) / (scaledW / img.naturalWidth);
          const srcY = (y - offsetY) / (scaledH / img.naturalHeight);
          const srcW = w / (scaledW / img.naturalWidth);
          const srcH = h / (scaledH / img.naturalHeight);

          ctx.drawImage(
            img,
            srcX, srcY, srcW, srcH,
            x, y, w, h
          );

          ctx.restore();
        }

        rafRef.current = requestAnimationFrame(render);
      };

      rafRef.current = requestAnimationFrame(render);
    };

    if (img.complete && img.naturalWidth > 0) {
      startAnimation();
    } else {
      img.onload = startAnimation;
      img.onerror = () => {
        onComplete?.();
      };
    }

    return () => {
      clearTimeout(fallbackTimer);
      cleanup();
    };
  }, [incomingSrc, focalPoint, pattern, onComplete, reducedMotion, cleanup]);

  // Reduced motion: render nothing (parent will use instant swap)
  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-30 pointer-events-none"
      aria-hidden="true"
      style={{ imageRendering: 'auto' }}
    />
  );
}

