import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GoldButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = true, children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center rounded-sm font-medium tracking-wide transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none uppercase font-sans";
    
    const variants = {
      primary: "bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-navy-900 hover:brightness-110 border border-transparent",
      outline: "border border-gold-400 text-gold-400 hover:bg-gold-400/10",
      ghost: "text-gold-400 hover:text-gold-300 hover:underline decoration-gold-400/50 underline-offset-4"
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-12 px-8 text-sm",
      lg: "h-14 px-10 text-base"
    };

    const glowStyles = glow && variant === 'primary' 
      ? "hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
      : "";

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], glowStyles, className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        {variant === 'primary' && (
          <div className="absolute inset-0 rounded-sm bg-white/20 blur opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </motion.button>
    );
  }
);

GoldButton.displayName = "GoldButton";
