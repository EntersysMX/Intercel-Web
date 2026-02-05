/**
 * Navbar Component - Apple-style Floating Navigation
 * Material Design 3 with glassmorphism
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
  Container,
  useScrollTrigger,
  Slide,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/plans';
import { images } from '../data/assets';
import { colors, animation, shadows, blur } from '../styles/designTokens';

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

  const drawer = (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: colors.gradients.hero,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box
          component="img"
          src={images.logo}
          alt="Intercel"
          sx={{ height: 40, filter: 'brightness(0) invert(1)' }}
        />
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ flex: 1, pt: 4 }}>
        <AnimatePresence>
          {navLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ delay: index * 0.08 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  onClick={handleDrawerToggle}
                  sx={{
                    py: 2.5,
                    px: 4,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      sx: {
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: link.active ? 600 : 400,
                        letterSpacing: '-0.02em',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>

      <Box sx={{ p: 4, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Button
          fullWidth
          variant="contained"
          href="https://intercel.com.mx/comprar-esim/"
          sx={{
            py: 2,
            backgroundColor: 'white',
            color: colors.primary.main,
            fontSize: '1.1rem',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: shadows.glow.white,
            },
          }}
        >
          Comprar eSIM
        </Button>
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

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: '100%',
            background: 'transparent',
          },
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
