/**
 * Design Tokens - Intercel Brand System
 * Inspired by Material Design 3 + Apple Human Interface Guidelines
 * Following Silicon Valley best practices
 */

// ============================================
// COLOR TOKENS - Material Design 3 Palette
// ============================================
export const colors = {
  // Primary Brand Colors
  primary: {
    main: '#047384',
    light: '#0A9AB0',
    dark: '#035A68',
    contrast: '#FFFFFF',
    surface: 'rgba(4, 115, 132, 0.08)',
    hover: 'rgba(4, 115, 132, 0.12)',
    pressed: 'rgba(4, 115, 132, 0.16)',
  },

  // Secondary Colors
  secondary: {
    main: '#00C6AE',
    light: '#33D4C2',
    dark: '#009B89',
    contrast: '#FFFFFF',
  },

  // Accent Colors
  accent: {
    teal: '#047384',
    cyan: '#00BCD4',
    emerald: '#10B981',
    amber: '#F59E0B',
    rose: '#F43F5E',
  },

  // Surface Colors (Material Design 3)
  surface: {
    background: '#FAFBFC',
    card: '#FFFFFF',
    cardElevated: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.5)',
    scrim: 'rgba(0, 0, 0, 0.32)',
  },

  // Text Colors
  text: {
    primary: '#1A1A2E',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    disabled: '#CBD5E1',
    inverse: '#FFFFFF',
  },

  // Border Colors
  border: {
    default: '#E2E8F0',
    subtle: '#F1F5F9',
    strong: '#CBD5E1',
  },

  // State Colors
  state: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #047384 0%, #0A9AB0 100%)',
    secondary: 'linear-gradient(135deg, #00C6AE 0%, #047384 100%)',
    hero: 'linear-gradient(180deg, rgba(4, 115, 132, 0.95) 0%, rgba(4, 115, 132, 0.8) 50%, rgba(10, 154, 176, 0.9) 100%)',
    card: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
    featured: 'linear-gradient(135deg, #047384 0%, #00C6AE 50%, #0A9AB0 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
};

// ============================================
// TYPOGRAPHY TOKENS - Apple SF Pro Inspired
// ============================================
export const typography = {
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif",
    display: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Monaco', monospace",
  },

  // Font Weights
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Font Sizes (rem-based for accessibility)
  size: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  // Line Heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// ============================================
// SPACING TOKENS - 8pt Grid System
// ============================================
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
};

// ============================================
// BORDER RADIUS TOKENS
// ============================================
export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',     // 12px
  lg: '1rem',        // 16px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '2rem',     // 32px
  full: '9999px',
};

// ============================================
// SHADOW TOKENS - Material Design 3 Elevation
// ============================================
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',

  // Material Design 3 Elevation Shadows
  elevation: {
    1: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
    2: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
    3: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3)',
    4: '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.3)',
    5: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.3)',
  },

  // Glow Effects
  glow: {
    primary: '0 0 20px rgba(4, 115, 132, 0.3)',
    secondary: '0 0 20px rgba(0, 198, 174, 0.3)',
    white: '0 0 30px rgba(255, 255, 255, 0.2)',
  },

  // Card Shadows
  card: {
    rest: '0 4px 20px rgba(0, 0, 0, 0.08)',
    hover: '0 12px 40px rgba(4, 115, 132, 0.15)',
    active: '0 8px 30px rgba(4, 115, 132, 0.2)',
  },
};

// ============================================
// ANIMATION TOKENS - Apple-style Smooth
// ============================================
export const animation = {
  // Durations
  duration: {
    instant: '0ms',
    faster: '100ms',
    fast: '200ms',
    normal: '300ms',
    slow: '400ms',
    slower: '500ms',
    slowest: '700ms',
  },

  // Easing Functions (Apple-inspired)
  // CSS format for regular CSS transitions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Apple's signature bounce
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Material Design 3 Emphasized
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
    emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  },

  // Framer Motion compatible easing (array format)
  easingFM: {
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    emphasized: [0.2, 0, 0, 1],
  },

  // Spring Configurations for Framer Motion
  spring: {
    gentle: { type: 'spring', stiffness: 120, damping: 14 },
    wobbly: { type: 'spring', stiffness: 180, damping: 12 },
    stiff: { type: 'spring', stiffness: 260, damping: 20 },
    slow: { type: 'spring', stiffness: 80, damping: 20 },
    molasses: { type: 'spring', stiffness: 50, damping: 30 },
  },
};

// ============================================
// BREAKPOINT TOKENS
// ============================================
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================
// Z-INDEX TOKENS
// ============================================
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// ============================================
// BLUR TOKENS
// ============================================
export const blur = {
  none: '0',
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
};

// ============================================
// COMPONENT SPECIFIC TOKENS
// ============================================
export const components = {
  // Button Tokens
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
      xl: '56px',
    },
    padding: {
      sm: '0 12px',
      md: '0 20px',
      lg: '0 28px',
      xl: '0 36px',
    },
    fontSize: {
      sm: typography.size.sm,
      md: typography.size.base,
      lg: typography.size.lg,
      xl: typography.size.xl,
    },
    borderRadius: borderRadius.lg,
  },

  // Card Tokens
  card: {
    padding: {
      sm: spacing[4],
      md: spacing[6],
      lg: spacing[8],
    },
    borderRadius: borderRadius['2xl'],
    background: colors.surface.card,
    shadow: shadows.card.rest,
    shadowHover: shadows.card.hover,
  },

  // Input Tokens
  input: {
    height: {
      sm: '36px',
      md: '44px',
      lg: '52px',
    },
    padding: '0 16px',
    borderRadius: borderRadius.lg,
    borderColor: colors.border.default,
    borderColorFocus: colors.primary.main,
  },

  // Navbar Tokens
  navbar: {
    height: '80px',
    heightMobile: '64px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropBlur: blur.lg,
  },

  // Pricing Card Tokens
  pricingCard: {
    width: '320px',
    minHeight: '480px',
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
  },
};

// ============================================
// EXPORT COMBINED THEME
// ============================================
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  blur,
  components,
};

export default theme;
