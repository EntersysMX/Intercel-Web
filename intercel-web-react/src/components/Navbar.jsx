/**
 * Navbar Component - Apple-style Floating Navigation
 * Material Design 3 with glassmorphism
 * Mobile menu optimized for UX (WCAG 2.1, Material Design, Apple HIG)
 */

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Container,
  useScrollTrigger,
  Slide,
  useMediaQuery,
  useTheme,
  Typography,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  CreditCard as PlansIcon,
  Help as HelpIcon,
  Phone as PhoneIcon,
  ShoppingCart as ShopIcon,
  WhatsApp as WhatsAppIcon,
  KeyboardArrowRight as ArrowIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/plans';
import { images } from '../data/assets';
import { colors, animation, shadows, blur } from '../styles/designTokens';

// Icon mapping for navigation links
const navIcons = {
  'Inicio': HomeIcon,
  'Planes': PlansIcon,
  'FAQ': HelpIcon,
  'Contacto': PhoneIcon,
};

// Hide on scroll behavior
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navbarStyles = {
    backgroundColor: scrolled
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: `blur(${blur.xl})`,
    WebkitBackdropFilter: `blur(${blur.xl})`,
    boxShadow: scrolled ? shadows.md : 'none',
    borderBottom: scrolled
      ? `1px solid ${colors.border.subtle}`
      : '1px solid transparent',
    transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
  };

  const logoVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  };

  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 + 0.2 },
    }),
  };

  // Mobile Drawer - Optimized for UX (WCAG 2.1, Material Design, Apple HIG)
  // - Minimum touch target: 48px (Google) / 44px (Apple)
  // - Clear visual feedback on interaction
  // - Adequate spacing between interactive elements
  // - Bottom-anchored for thumb reachability
  const drawer = (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(180deg, #047384 0%, #035A68 50%, #024450 100%)',
        display: 'flex',
        flexDirection: 'column',
        // Safe area padding for notched devices
        pt: 'env(safe-area-inset-top)',
        pb: 'env(safe-area-inset-bottom)',
      }}
    >
      {/* Header - Fixed height for consistency */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2,
          minHeight: 64,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box
          component="img"
          src={images.logo}
          alt="Intercel"
          sx={{ height: 36, filter: 'brightness(0) invert(1)' }}
        />
        {/* Close button - 48x48 touch target (WCAG/Material) */}
        <IconButton
          onClick={handleDrawerToggle}
          aria-label="Cerrar menú"
          sx={{
            color: 'white',
            width: 48,
            height: 48,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:active': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              transform: 'scale(0.95)',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      {/* Navigation Links - Scrollable area */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 2 }}>
        <List disablePadding>
          <AnimatePresence>
            {navLinks.map((link, index) => {
              const IconComponent = navIcons[link.label] || HomeIcon;
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                >
                  <ListItem disablePadding sx={{ px: 2, mb: 1 }}>
                    <ListItemButton
                      component="a"
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={handleDrawerToggle}
                      sx={{
                        // Minimum 48px height for touch targets
                        minHeight: 56,
                        px: 2.5,
                        py: 1.5,
                        borderRadius: '16px',
                        backgroundColor: link.active
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'transparent',
                        border: link.active
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : '1px solid transparent',
                        transition: 'all 0.2s ease',
                        // Hover state
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        },
                        // Active/pressed state - important for touch feedback
                        '&:active': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'scale(0.98)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 44 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '12px',
                            backgroundColor: link.active
                              ? 'rgba(0, 198, 174, 0.3)'
                              : 'rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconComponent
                            sx={{
                              fontSize: 22,
                              color: link.active ? '#00E5C9' : 'rgba(255, 255, 255, 0.9)',
                            }}
                          />
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={link.label}
                        secondary={link.active ? 'Estás aquí' : null}
                        primaryTypographyProps={{
                          sx: {
                            color: 'white',
                            fontSize: '1.1rem',
                            fontWeight: link.active ? 600 : 500,
                            letterSpacing: '-0.01em',
                          },
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            color: '#00E5C9',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          },
                        }}
                      />
                      <ArrowIcon
                        sx={{
                          fontSize: 20,
                          color: 'rgba(255, 255, 255, 0.5)',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </List>
      </Box>

      {/* Bottom Actions - Fixed at bottom for easy thumb reach */}
      <Box
        sx={{
          p: 3,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Primary CTA - Large touch target */}
        <Button
          fullWidth
          variant="contained"
          href="https://intercel.com.mx/comprar-esim/"
          startIcon={<ShopIcon />}
          sx={{
            py: 2,
            minHeight: 56,
            background: 'linear-gradient(135deg, #00C6AE 0%, #00E5C9 100%)',
            color: '#035A68',
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 198, 174, 0.3)',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #00E5C9 0%, #00FFE0 100%)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Comprar eSIM
        </Button>

        {/* Secondary action - WhatsApp */}
        <Button
          fullWidth
          variant="outlined"
          href="https://wa.me/5215589931510?text=Hola,%20necesito%20información%20sobre%20los%20planes%20de%20Intercel"
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<WhatsAppIcon />}
          sx={{
            mt: 1.5,
            py: 1.5,
            minHeight: 52,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '14px',
            textTransform: 'none',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          Contáctanos
        </Button>

        {/* Trust indicator */}
        <Typography
          sx={{
            textAlign: 'center',
            mt: 2,
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          Operador autorizado por el IFT
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" sx={navbarStyles}>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                minHeight: { xs: 64, lg: 80 },
                justifyContent: 'space-between',
              }}
            >
              {/* Logo */}
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Box
                  component="a"
                  href="https://intercel.com.mx/"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                >
                  <Box
                    component="img"
                    src={images.logo}
                    alt="Intercel"
                    sx={{
                      height: { xs: 36, lg: 44 },
                      transition: `transform ${animation.duration.normal} ${animation.easing.easeInOut}`,
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Box>
              </motion.div>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      variants={linkVariants}
                      initial="initial"
                      animate="animate"
                      custom={index}
                    >
                      <Button
                        component="a"
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        sx={{
                          color: link.active ? colors.primary.main : colors.text.primary,
                          fontWeight: link.active ? 600 : 500,
                          fontSize: '0.95rem',
                          px: 2,
                          py: 1,
                          borderRadius: '12px',
                          backgroundColor: link.active ? colors.primary.surface : 'transparent',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            backgroundColor: colors.primary.surface,
                            color: colors.primary.main,
                          },
                          '&::after': link.active ? {
                            content: '""',
                            position: 'absolute',
                            bottom: 4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: colors.primary.main,
                          } : {},
                        }}
                      >
                        {link.label}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              )}

              {/* CTA Button & Mobile Menu */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {!isMobile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      variant="contained"
                      href="https://intercel.com.mx/comprar-esim/"
                      sx={{
                        background: colors.gradients.primary,
                        px: 3,
                        py: 1.2,
                        borderRadius: '14px',
                        fontWeight: 600,
                        boxShadow: shadows.md,
                        '&:hover': {
                          background: colors.gradients.primary,
                          boxShadow: shadows.glow.primary,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Comprar eSIM
                    </Button>
                  </motion.div>
                )}

                {isMobile && (
                  <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                      color: colors.primary.main,
                      backgroundColor: colors.primary.surface,
                      width: 44,
                      height: 44,
                      '&:hover': {
                        backgroundColor: colors.primary.hover,
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer - Slides from bottom for better ergonomics */}
      <Drawer
        variant="temporary"
        anchor="bottom"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: '100%',
            height: '100%',
            background: 'transparent',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        }}
        SlideProps={{
          direction: 'up',
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed navbar */}
      <Toolbar sx={{ minHeight: { xs: 64, lg: 80 } }} />
    </>
  );
};

export default Navbar;
