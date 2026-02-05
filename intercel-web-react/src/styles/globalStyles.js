/**
 * Global Styles - CSS-in-JS with Design Tokens
 * Apple-inspired smooth aesthetics
 */

import { colors, typography, animation, blur } from './designTokens';

export const globalStyles = `
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: ${typography.fontFamily.primary};
    background-color: ${colors.surface.background};
    color: ${colors.text.primary};
    line-height: ${typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow-x: hidden;
  }

  ::selection {
    background-color: ${colors.primary.main};
    color: ${colors.primary.contrast};
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${colors.surface.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.border.strong};
    border-radius: 4px;
    transition: background ${animation.duration.fast} ${animation.easing.easeInOut};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.primary.main};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${animation.duration.fast} ${animation.easing.easeInOut};
  }

  button {
    cursor: pointer;
    font-family: inherit;
    border: none;
    background: none;
  }

  input, textarea, select {
    font-family: inherit;
  }

  /* Glassmorphism utility */
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(${blur.lg});
    -webkit-backdrop-filter: blur(${blur.lg});
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-dark {
    background: rgba(4, 115, 132, 0.85);
    backdrop-filter: blur(${blur.xl});
    -webkit-backdrop-filter: blur(${blur.xl});
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Animation utilities */
  .fade-in {
    animation: fadeIn ${animation.duration.slow} ${animation.easing.easeOut} forwards;
  }

  .slide-up {
    animation: slideUp ${animation.duration.slow} ${animation.easing.emphasized} forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  /* Focus visible styles for accessibility */
  :focus-visible {
    outline: 2px solid ${colors.primary.main};
    outline-offset: 2px;
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    html {
      scroll-behavior: auto;
    }
  }
`;

export default globalStyles;
