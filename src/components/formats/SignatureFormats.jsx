import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import FormatStage, {
  PATH_FLAT_BOTTOM,
  PATH_ARCHED_TOP,
  PATH_FLAT_TOP,
} from './FormatStage';
import FormatAlbum from './FormatAlbum';
import FormatInfoCard from './FormatInfoCard';
import { FORMAT_FAMILIES } from '../../data/formatFamilies';

gsap.registerPlugin(ScrollTrigger);

/**
 * SignatureFormats Component (v4).
 * - Full 21oaks signature curved page transitions:
 *   - Each format family is an independent physical panel stacked in z-order (10, 20, 30, 40).
 *   - As the visitor scrolls, the next panel sweeps up smoothly over the previous one with an arched SVG Bezier curve.
 *   - The previous panel stays 100% visible underneath the curve until covered.
 *   - The giant wordmark glides in at z-10 directly behind the physical 3D album at z-20.
 *   - The 3D album rises and scales up in front of the words, establishing luxurious depth.
 *   - The words remain serenely visible behind the album throughout the peaceful resting plateau (never rushing away!).
 *   - Generous 450% scroll runway with dedicated resting plateaus (never rushed or cluttered).
 *   - Interactive 4-step mini-album indicator with smooth scroll jumps.
 */
export default function SignatureFormats() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const panelsRef = useRef([]);
  const curvedPathsRef = useRef([]);
  const wordmarksRef = useRef([]);
  const albumsRef = useRef([]);
  const rightColumnsRef = useRef([]);

  const [activeFormatIndex, setActiveFormatIndex] = useState(0);
  const scrollTriggerRef = useRef(null);

  // Jump to specific album on indicator click
  const handleSelectIndex = useCallback((targetIndex) => {
    setActiveFormatIndex(targetIndex);

    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;

    // Resting plateau centers on the 0..1 progress scale
    const progressMap = [0.06, 0.35, 0.65, 0.94];
    const targetProgress = progressMap[targetIndex] ?? 0.06;
    const targetScroll = st.start + targetProgress * (st.end - st.start);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, []);

  // Handle Enquiry Pre-fill
  const handleEnquire = useCallback((format) => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      const messageInput = document.getElementById('contact-message');
      if (messageInput) {
        messageInput.value = `Hello, I would like to enquire about the ${format.name} (${format.specs.formatType}). Please share specifications and sample options.`;
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  }, []);

  // Master GSAP Curved Scrub Timeline Setup
  useEffect(() => {
    if (shouldReduceMotion) return;

    const sectionEl = sectionRef.current;
    const stageEl = stageRef.current;
    if (!sectionEl || !stageEl) return;

    const panels = panelsRef.current;
    const curvedPaths = curvedPathsRef.current;
    const wordmarks = wordmarksRef.current;
    const albums = albumsRef.current;
    const rightColumns = rightColumnsRef.current;

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      panels.forEach((panel, idx) => {
        if (panel && idx > 0) {
          gsap.set(panel, { y: '105%' });
        }
      });

      curvedPaths.forEach((path, idx) => {
        if (path && idx > 0) {
          gsap.set(path, { attr: { d: PATH_FLAT_BOTTOM } });
        }
      });

      wordmarks.forEach((el, idx) => {
        if (el && idx > 0) {
          gsap.set(el, { y: 60, opacity: 0 });
        }
      });

      albums.forEach((el, idx) => {
        if (el && idx > 0) {
          gsap.set(el, {
            y: 120,
            scale: 0.85,
            opacity: 0,
            transformOrigin: 'center bottom',
          });
        }
      });

      rightColumns.forEach((el, idx) => {
        if (el && idx > 0) {
          gsap.set(el, { y: 40, opacity: 0 });
        }
      });

      // 2. Master Scrub Timeline with responsive track and reliable pinSpacing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          scrub: 1.0,
          anticipatePin: 1,
          snap: {
            snapTo: [0.0, 0.33, 0.66, 1.0],
            duration: { min: 0.25, max: 0.5 },
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const p = self.progress;
            let currentIdx = 0;
            if (p >= 0.82) {
              currentIdx = 3;
            } else if (p >= 0.48) {
              currentIdx = 2;
            } else if (p >= 0.16) {
              currentIdx = 1;
            } else {
              currentIdx = 0;
            }
            setActiveFormatIndex(currentIdx);
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      // =========================================================================
      // TIMELINE CHOREOGRAPHY
      // Total duration = 12.0
      // Plateau 0: 0.0 -> 1.5
      // Transition 0 -> 1: 1.5 -> 3.5 (Plateau 1: 3.5 -> 5.0)
      // Transition 1 -> 2: 5.0 -> 7.0 (Plateau 2: 7.0 -> 8.5)
      // Transition 2 -> 3: 8.5 -> 10.5 (Plateau 3: 10.5 -> 12.0)
      // =========================================================================

      // Initial Hold Zone on Format 0 (Slip-in Albums, Pale Blush)
      tl.to({}, { duration: 1.5 });

      // -------------------------------------------------------------------------
      // TRANSITION 1: Panel 1 (Flush Mount Albums, Misty Blue) sweeps over Panel 0
      // -------------------------------------------------------------------------
      tl.addLabel('step1')
        // Panel 1 rises from y: 105% to 0%
        .to(
          panels[1],
          {
            y: '0%',
            duration: 2.0,
            ease: 'power2.inOut',
          },
          'step1'
        )
        // SVG curve arches upward on leading edge, then flattens at top
        .to(
          curvedPaths[1],
          {
            attr: { d: PATH_ARCHED_TOP },
            duration: 1.0,
            ease: 'power2.out',
          },
          'step1'
        )
        .to(
          curvedPaths[1],
          {
            attr: { d: PATH_FLAT_TOP },
            duration: 1.0,
            ease: 'power2.in',
          },
          'step1+=1.0'
        )
        // Watermark "PANORAMIC" glides up behind the album at z-10
        .to(
          wordmarks[1],
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          'step1+=0.3'
        )
        // Album 1 rises and scales up in front of the words at z-20
        .to(
          albums[1],
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: 'power2.out',
          },
          'step1+=0.4'
        )
        // Right column (headline + info card) glides into place
        .to(
          rightColumns[1],
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power2.out',
          },
          'step1+=0.6'
        );

      // Plateau 1 Hold Zone (Format 1 rests peacefully)
      tl.to({}, { duration: 1.5 });

      // -------------------------------------------------------------------------
      // TRANSITION 2: Panel 2 (Photo Book, Oak Wood) sweeps over Panel 1
      // -------------------------------------------------------------------------
      tl.addLabel('step2')
        .to(
          panels[2],
          {
            y: '0%',
            duration: 2.0,
            ease: 'power2.inOut',
          },
          'step2'
        )
        .to(
          curvedPaths[2],
          {
            attr: { d: PATH_ARCHED_TOP },
            duration: 1.0,
            ease: 'power2.out',
          },
          'step2'
        )
        .to(
          curvedPaths[2],
          {
            attr: { d: PATH_FLAT_TOP },
            duration: 1.0,
            ease: 'power2.in',
          },
          'step2+=1.0'
        )
        // Watermark "EDITORIAL" glides up behind the album
        .to(
          wordmarks[2],
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          'step2+=0.3'
        )
        // Album 2 rises and scales up in front
        .to(
          albums[2],
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: 'power2.out',
          },
          'step2+=0.4'
        )
        .to(
          rightColumns[2],
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power2.out',
          },
          'step2+=0.6'
        );

      // Plateau 2 Hold Zone (Format 2 rests peacefully)
      tl.to({}, { duration: 1.5 });

      // -------------------------------------------------------------------------
      // TRANSITION 3: Panel 3 (Luxury Albums, Nordic Blue) sweeps over Panel 2
      // -------------------------------------------------------------------------
      tl.addLabel('step3')
        .to(
          panels[3],
          {
            y: '0%',
            duration: 2.0,
            ease: 'power2.inOut',
          },
          'step3'
        )
        .to(
          curvedPaths[3],
          {
            attr: { d: PATH_ARCHED_TOP },
            duration: 1.0,
            ease: 'power2.out',
          },
          'step3'
        )
        .to(
          curvedPaths[3],
          {
            attr: { d: PATH_FLAT_TOP },
            duration: 1.0,
            ease: 'power2.in',
          },
          'step3+=1.0'
        )
        // Watermark "HEIRLOOM" glides up behind the album
        .to(
          wordmarks[3],
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          },
          'step3+=0.3'
        )
        // Album 3 (Tuscan leather with gilded edges) rises and scales up
        .to(
          albums[3],
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: 'power2.out',
          },
          'step3+=0.4'
        )
        .to(
          rightColumns[3],
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power2.out',
          },
          'step3+=0.6'
        );

      // Final Plateau 3 Hold Zone (Format 3 rests before releasing pin)
      tl.to({}, { duration: 1.5 });
    }, sectionRef);

    // Refresh ScrollTrigger once DOM layout and images settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  // Fallback view for users with prefers-reduced-motion
  if (shouldReduceMotion) {
    return (
      <section
        id="signature-formats"
        className="w-full flex flex-col"
        aria-label="Signature Format Families"
      >
        {FORMAT_FAMILIES.map((format, idx) => (
          <div
            key={format.id}
            className="py-16 sm:py-24 px-4 sm:px-8 border-b border-charcoal/10"
            style={{
              backgroundColor: format.bgColor,
              color: format.textColor,
            }}
          >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <FormatAlbum format={format} isMini={false} />
              </div>
              <div className="w-full lg:w-1/2 max-w-lg">
                <span className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-70">
                  Format 0{idx + 1}
                </span>
                <span className="font-serif italic text-base block mt-1 opacity-80">
                  {format.subtitle}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight mt-1 mb-3">
                  {format.name}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed mb-6 opacity-85">
                  {format.description}
                </p>
                <FormatInfoCard format={format} onEnquire={handleEnquire} />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      id="signature-formats"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      aria-label="Signature Format Families"
    >
      <FormatStage
        formats={FORMAT_FAMILIES}
        stageRef={stageRef}
        panelsRef={panelsRef}
        curvedPathsRef={curvedPathsRef}
        wordmarksRef={wordmarksRef}
        albumsRef={albumsRef}
        rightColumnsRef={rightColumnsRef}
        activeFormatIndex={activeFormatIndex}
        onSelectIndex={handleSelectIndex}
        onEnquire={handleEnquire}
      />
    </section>
  );
}
