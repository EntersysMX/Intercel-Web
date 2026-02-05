/**
 * Material UI Theme Configuration
 * Based on Design Tokens - Material Design 3 Compliant
 */

import { createTheme } from '@mui/material/styles';
import { colors, typography, borderRadius, shadows, animation, breakpoints } from './designTokens';

const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: colors.primary.contrast,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrastText: colors.secondary.contrast,
    },
    error: {
      main: colors.state.error,
    },
    warning: {
      main: colors.state.warning,
    },
    info: {
      main: colors.state.info,
    },
    success: {
      main: colors.state.success,
    },
    background: {
      default: colors.surface.background,
      paper: colors.surface.card,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
    },
    divider: colors.border.default,
  },

  typography: {
    fontFamily: typography.fontFamily.primary,
    h1: {
      fontFamily: typography.fontFamily.display,
      fontWeight: typography.weight.bold,
      fontSize: typography.size['5xl'],
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
      fontFamily: typography.fontFamily.display,
      fontWeight: typography.weight.bold,
      fontSize: typography.size['4xl'],
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
      fontFamily: typography.fontFamily.display,
      fontWeight: typography.weight.semibold,
      fontSize: typography.size['3xl'],
      lineHeight: typography.lineHeight.snug,
    },
    h4: {
      fontFamily: typography.fontFamily.primary,
      fontWeight: typography.weight.semibold,
      fontSize: typography.size['2xl'],
      lineHeight: typography.lineHeight.snug,
    },
    h5: {
      fontFamily: typography.fontFamily.primary,
      fontWeight: typography.weight.semibold,
      fontSize: typography.size.xl,
      lineHeight: typography.lineHeight.normal,
    },
    h6: {
      fontFamily: typography.fontFamily.primary,
      fontWeight: typography.weight.semibold,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.normal,
    },
    subtitle1: {
      fontWeight: typography.weight.medium,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.relaxed,
    },
    subtitle2: {
      fontWeight: typography.weight.medium,
      fontSize: typography.size.base,
      lineHeight: typography.lineHeight.relaxed,
    },
    body1: {
      fontSize: typography.size.base,
      lineHeight: typography.lineHeight.relaxed,
    },
    body2: {
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.relaxed,
    },
    button: {
      fontWeight: typography.weight.semibold,
      fontSize: typography.size.base,
      textTransform: 'none',
      letterSpacing: typography.letterSpacing.normal,
    },
    caption: {
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.normal,
    },
    overline: {
      fontSize: typography.size.xs,
      fontWeight: typography.weight.semibold,
      letterSpacing: typography.letterSpacing.wider,
      textTransform: 'uppercase',
    },
  },

  shape: {
    borderRadius: parseInt(borderRadius.lg) * 16,
  },

  shadows: [
    'none',
    shadows.sm,
    shadows.DEFAULT,
    shadows.md,
    shadows.lg,
    shadows.xl,
    shadows['2xl'],
    shadows.elevation[1],
    shadows.elevation[2],
    shadows.elevation[3],
    shadows.elevation[4],
    shadows.elevation[5],
    shadows.card.rest,
    shadows.card.hover,
    shadows.card.active,
    shadows.glow.primary,
    shadows.glow.secondary,
    ...Array(8).fill(shadows['2xl']),
  ],

  breakpoints: {
    values: {
      xs: 0,
      sm: parseInt(breakpoints.sm),
      md: parseInt(breakpoints.md),
      lg: parseInt(breakpoints.lg),
      xl: parseInt(breakpoints.xl),
    },
  },

  transitions: {
    duration: {
      shortest: parseInt(animation.duration.faster),
      shorter: parseInt(animation.duration.fast),
      short: parseInt(animation.duration.normal),
      standard: parseInt(animation.duration.slow),
      complex: parseInt(animation.duration.slower),
      enteringScreen: parseInt(animation.duration.normal),
      leavingScreen: parseInt(animation.duration.fast),
    },
    easing: {
      easeInOut: animation.easing.easeInOut,
      easeOut: animation.easing.easeOut,
      easeIn: animation.easing.easeIn,
      sharp: animation.easing.emphasized,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          fontFamily: typography.fontFamily.primary,
          backgroundColor: colors.surface.background,
          color: colors.text.primary,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': {
          backgroundColor: colors.primary.main,
          color: colors.primary.contrast,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          padding: '12px 28px',
          fontSize: typography.size.base,
          fontWeight: typography.weight.semibold,
          textTransform: 'none',
          boxShadow: 'none',
          transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
          '&:hover': {
            boxShadow: shadows.md,
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: colors.gradients.primary,
          '&:hover': {
            background: colors.gradients.primary,
            boxShadow: shadows.glow.primary,
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            backgroundColor: colors.primary.surface,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius['2xl'],
          boxShadow: shadows.card.rest,
          transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
          border: `1px solid ${colors.border.subtle}`,
          overflow: 'hidden',
          '&:hover': {
            boxShadow: shadows.card.hover,
            transform: 'translateY(-4px)',
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.border.subtle}`,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.full,
          fontWeight: typography.weight.medium,
        },
        filled: {
          backgroundColor: colors.primary.surface,
          color: colors.primary.main,
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius.lg,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary.light,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary.main,
              borderWidth: '2px',
            },
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `all ${animation.duration.fast} ${animation.easing.easeInOut}`,
          '&:hover': {
            backgroundColor: colors.primary.surface,
            transform: 'scale(1.1)',
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: `color ${animation.duration.fast} ${animation.easing.easeInOut}`,
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
    },
  },
});

export default muiTheme;
