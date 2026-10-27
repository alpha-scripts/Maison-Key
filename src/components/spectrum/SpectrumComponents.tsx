import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';

/**
 * Spectrum UI + iOS Human Interface Guidelines Component & Motion Primitives
 * Includes Load-Up Stagger, Scroll Reveal, 3D Tilt Spotlight Cards, Shimmer Buttons, and Animated Counters
 */

// 0. Animated Number Counter (Spring-interpolated tabular numerals)
interface SpectrumAnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const SpectrumAnimatedNumber: React.FC<SpectrumAnimatedNumberProps> = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const springValue = useSpring(value, {
    stiffness: 220,
    damping: 28,
    mass: 0.8,
  });

  const [display, setDisplay] = useState(() =>
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()
  );

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (decimals > 0) {
        setDisplay(Number(latest).toFixed(decimals));
      } else {
        setDisplay(Math.round(latest).toLocaleString());
      }
    });
    return unsubscribe;
  }, [springValue, decimals]);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

// 1. Load-Up & Scroll Reveal Motion Wrappers
interface SpectrumScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
}

export const SpectrumScrollReveal: React.FC<SpectrumScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const translateClass = {
    up: isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-5 scale-[0.985] opacity-0',
    down: isVisible ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-5 scale-[0.985] opacity-0',
    left: isVisible ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-5 scale-[0.985] opacity-0',
    right: isVisible ? 'translate-x-0 scale-100 opacity-100' : '-translate-x-5 scale-[0.985] opacity-0',
    none: isVisible ? 'scale-100 opacity-100' : 'scale-[0.985] opacity-0',
  }[direction];

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${Math.round(delay * 1000)}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      className={`transition-all duration-500 will-change-transform ${translateClass} ${className}`}
    >
      {children}
    </div>
  );
};

// Stagger container for initial load-up or grid cascades
export const spectrumStaggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

export const spectrumStaggerItem = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
  },
};

// 2. Spectrum Spotlight Card with 3D Perspective Tilt, Radial Glow & Hover Lift
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  hoverLift?: boolean;
  tilt?: boolean;
  onClick?: () => void;
}

export const SpectrumSpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(0, 122, 255, 0.08)',
  hoverLift = true,
  tilt = true,
  onClick,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Subtle 3D tilt motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [2.2, -2.2]), {
    stiffness: 300,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-2.2, 2.2]), {
    stiffness: 300,
    damping: 28,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    if (tilt && rect.width > 0 && rect.height > 0) {
      mouseX.set(x / rect.width);
      mouseY.set(y / rect.height);
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      whileHover={
        hoverLift
          ? {
              y: -5,
              scale: 1.008,
              boxShadow:
                '0 18px 38px -10px rgba(0, 0, 0, 0.09), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
            }
          : undefined
      }
      whileTap={onClick ? { scale: 0.985 } : undefined}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-[24px] bg-white border border-black/[0.07] shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.02)] transition-colors duration-200 hover:border-[#007AFF]/25 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </motion.div>
  );
};

// 3. Spectrum Animated Segmented Control (iOS UISegmentedControl style)
export interface SegmentOption<T extends string | number> {
  id: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SegmentedControlProps<T extends string | number> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
}

export function SpectrumSegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  layoutId,
  size = 'md',
  fullWidth = false,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center p-1 bg-[#E5E5EA]/85 backdrop-blur-md rounded-[14px] border border-black/[0.04] ${
        fullWidth ? 'w-full flex' : ''
      }`}
    >
      {options.map((opt) => {
        const isActive = value === opt.id;
        const Icon = opt.icon;
        return (
          <motion.button
            key={String(opt.id)}
            type="button"
            role="tab"
            aria-selected={isActive}
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(opt.id)}
            className={`relative z-10 flex items-center justify-center gap-1.5 rounded-[10px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 select-none ${
              fullWidth ? 'flex-1' : ''
            } ${
              size === 'sm'
                ? 'px-3 py-1.5 text-xs min-h-[34px]'
                : 'px-3.5 py-2 text-xs sm:text-[13px] min-h-[38px]'
            } ${isActive ? 'text-neutral-950 font-semibold' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                className="absolute inset-0 bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.09),0_1px_2px_rgba(0,0,0,0.04)] border border-black/[0.04] -z-10"
              />
            )}
            {Icon && (
              <Icon
                className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                  isActive ? 'text-[#007AFF] scale-110' : 'text-neutral-500'
                }`}
              />
            )}
            <span>{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

// 4. iOS Native Toggle Switch (UISwitch) with Tactile Row Animation
interface IOSSwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  description?: string;
  badgeText?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isLast?: boolean;
}

export const SpectrumIOSSwitchRow: React.FC<IOSSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  badgeText,
  icon: Icon,
  isLast = false,
}) => {
  return (
    <motion.div
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      whileTap={{ scale: 0.992 }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange();
        }
      }}
      className={`group flex items-center justify-between gap-3 px-4 py-3.5 bg-white hover:bg-neutral-50/90 active:bg-neutral-100/90 transition-colors cursor-pointer select-none min-h-[54px] ${
        !isLast ? 'border-b border-neutral-200/70' : ''
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <motion.div
            animate={{ scale: checked ? 1.05 : 1 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className={`w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0 transition-colors ${
              checked
                ? 'bg-[#007AFF] text-white shadow-[0_2px_6px_rgba(0,122,255,0.28)]'
                : 'bg-[#F2F2F7] text-neutral-500 group-hover:bg-neutral-200/70'
            }`}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
        )}
        <div className="min-w-0">
          <div className="text-[13px] sm:text-sm font-medium text-neutral-900 truncate group-hover:text-[#007AFF] transition-colors">
            {label}
          </div>
          {description && <div className="text-[11px] text-neutral-500 truncate">{description}</div>}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {badgeText && (
          <motion.span
            animate={{ scale: checked ? 1.04 : 1 }}
            className={`text-xs font-mono tabular-nums transition-colors ${
              checked ? 'text-[#007AFF] font-semibold' : 'text-neutral-400'
            }`}
          >
            {badgeText}
          </motion.span>
        )}
        {/* Authentic iOS UISwitch */}
        <div
          className={`w-[46px] h-[28px] rounded-full p-[2px] transition-colors duration-200 flex items-center ${
            checked ? 'bg-[#34C759]' : 'bg-[#E5E5EA]'
          }`}
        >
          <motion.div
            animate={{ x: checked ? 18 : 0 }}
            transition={{ type: 'spring', stiffness: 520, damping: 30 }}
            className="w-[24px] h-[24px] rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.22),0_1px_1px_rgba(0,0,0,0.08)]"
          />
        </div>
      </div>
    </motion.div>
  );
};

// 5. Spectrum Shimmer / Tactile iOS Button with Spring Hover & Press Physics
interface SpectrumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ios-blue' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const SpectrumButton: React.FC<SpectrumButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-[14px] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF] focus-visible:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-neutral-950 text-white hover:bg-neutral-800 shadow-[0_2px_10px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.15)]',
    'ios-blue':
      'bg-[#007AFF] text-white hover:bg-[#0066D6] shadow-[0_4px_14px_rgba(0,122,255,0.28),inset_0_1px_0_rgba(255,255,255,0.2)]',
    secondary:
      'bg-white/95 text-neutral-900 border border-black/[0.08] hover:bg-neutral-100/90 hover:border-black/15 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-md',
    ghost: 'bg-transparent text-[#007AFF] hover:bg-[#007AFF]/10',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs min-h-[36px]',
    md: 'px-5 py-2.5 text-sm min-h-[44px]',
    lg: 'px-6 py-3.5 text-[15px] min-h-[48px]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 480, damping: 26 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...(props as any)}
    >
      {/* Subtle Spectrum Light Sweep Shimmer on Hover */}
      {(variant === 'primary' || variant === 'ios-blue') && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  );
};

// 6. Spectrum Animated Disclosure / iOS Grouped Accordion Item
interface SpectrumAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

export const SpectrumAccordionItem: React.FC<SpectrumAccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  isLast = false,
}) => {
  return (
    <div className={`bg-white transition-colors ${!isLast ? 'border-b border-neutral-200/70' : ''}`}>
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        whileTap={{ scale: 0.995 }}
        className="w-full px-5 sm:px-6 py-4.5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/80 active:bg-neutral-100/70 transition-colors cursor-pointer min-h-[56px]"
      >
        <span className="text-[15px] font-semibold text-neutral-900 leading-snug">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.08 : 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs transition-colors ${
            isOpen ? 'bg-[#007AFF] text-white shadow-[0_2px_6px_rgba(0,122,255,0.25)]' : 'bg-[#F2F2F7] text-neutral-500'
          }`}
        >
          ▾
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
