import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Minimal luxury Button component.
 * Follows design constraints: no heavy gradients or glassmorphism.
 * Restrained transitions with subtle scale and clear contrast.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-sans tracking-wider-luxury uppercase text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nordic-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-[11px] gap-1.5',
    md: 'px-6 py-3.5 text-xs gap-2',
    lg: 'px-8 py-4 text-xs tracking-widest-luxury gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-charcoal text-white hover:bg-black/85 active:scale-[0.99] border border-charcoal shadow-sm',
    secondary:
      'bg-oak-wood text-charcoal hover:bg-oak-wood/80 active:scale-[0.99] border border-oak-wood',
    outline:
      'bg-transparent text-charcoal border border-charcoal/40 hover:border-charcoal hover:bg-charcoal/5 active:scale-[0.99]',
    ghost:
      'bg-transparent text-charcoal hover:text-nordic-blue-dark px-0 py-1 underline-offset-8 hover:underline border-none shadow-none',
    white:
      'bg-white text-charcoal hover:bg-white/90 active:scale-[0.99] border border-white/80 shadow-sm',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
    variantStyles[variant] || variantStyles.primary
  } ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedStyles} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedStyles}
      {...props}
    >
      {content}
    </button>
  );
}

