/**
 * Footer Component - Material Design 3 Footer
 * Clean, modern footer with newsletter subscription
 */

import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Send,
  Email,
  Phone,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import {
  footerLinks,
  socialLinks,
  contactInfo,
  appStoreLinks,
} from '../data/plans';
import { images } from '../data/assets';
import { colors, shadows, animation, borderRadius } from '../styles/designTokens';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const socialIconMap = {
    facebook: <Facebook />,
    instagram: <Instagram />,
    linkedin: <LinkedIn />,
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.surface.card,
        borderTop: `1px solid ${colors.border.subtle}`,
        pt: { xs: 6, md: 8 },
        pb: { xs: 4, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Column 1: Logo & Social */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 3 }}>
                <Box
                  component="img"
                  src={images.logo}
                  alt="Intercel"
                  sx={{
                    height: 50,
                    mb: 2,
                  }}
                />
              </Box>

              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.platform}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: borderRadius.lg,
                      backgroundColor: colors.primary.surface,
                      color: colors.primary.main,
                      transition: `all ${animation.duration.fast} ${animation.easing.easeInOut}`,
                      '&:hover': {
                        backgroundColor: colors.primary.main,
                        color: 'white',
                        transform: 'translateY(-3px)',
                        boxShadow: shadows.md,
                      },
                    }}
                  >
                    {socialIconMap[social.platform]}
                  </IconButton>
                ))}
              </Box>

              {/* Menu Links */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {footerLinks.menu.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    sx={{
                      color: colors.text.secondary,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: `color ${animation.duration.fast} ease`,
                      '&:hover': {
                        color: colors.primary.main,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Column 2: Services */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: colors.text.primary,
                  mb: 3,
                }}
              >
                Servicios
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 4 }}>
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    sx={{
                      color: colors.text.secondary,
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      transition: `color ${animation.duration.fast} ease`,
                      '&:hover': {
                        color: colors.primary.main,
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Box>

              {/* App Store Badges */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link
                  href={appStoreLinks.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-block',
                    transition: `transform ${animation.duration.fast} ease`,
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={images.appStore}
                    alt="Download on App Store"
                    sx={{
                      height: 44,
                      borderRadius: borderRadius.md,
                    }}
                  />
                </Link>
                <Link
                  href={appStoreLinks.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-block',
                    transition: `transform ${animation.duration.fast} ease`,
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={images.playStore}
                    alt="Get it on Google Play"
                    sx={{
                      height: 44,
                      borderRadius: borderRadius.md,
                    }}
                  />
                </Link>
              </Box>
            </Grid>

            {/* Column 3: Newsletter & Contact */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: colors.text.primary,
                  mb: 2,
                }}
              >
                La mejor red está a un clic
              </Typography>

              {/* Newsletter Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mb: 4 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    backgroundColor: colors.surface.background,
                    borderRadius: borderRadius.xl,
                    p: 0.5,
                    border: `1px solid ${colors.border.default}`,
                  }}
                >
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    sx={{
                      '& input': {
                        px: 2,
                        py: 1.5,
                        fontSize: '0.95rem',
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      minWidth: 'auto',
                      px: 2.5,
                      borderRadius: borderRadius.lg,
                      background: colors.gradients.primary,
                      '&:hover': {
                        background: colors.gradients.primary,
                        boxShadow: shadows.glow.primary,
                      },
                    }}
                  >
                    <Send sx={{ fontSize: 20 }} />
                  </Button>
                </Box>
              </Box>

              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: borderRadius.md,
                      backgroundColor: colors.primary.surface,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Email sx={{ fontSize: 18, color: colors.primary.main }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: colors.text.tertiary,
                        fontWeight: 500,
                      }}
                    >
                      Mail
                    </Typography>
                    <Link
                      href={`mailto:${contactInfo.email}`}
                      sx={{
                        fontSize: '0.9rem',
                        color: colors.text.secondary,
                        fontWeight: 500,
                        '&:hover': { color: colors.primary.main },
                      }}
                    >
                      {contactInfo.email}
                    </Link>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: borderRadius.md,
                      backgroundColor: colors.primary.surface,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Phone sx={{ fontSize: 18, color: colors.primary.main }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: colors.text.tertiary,
                        fontWeight: 500,
                      }}
                    >
                      Call Center
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Link
                        href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                        sx={{
                          fontSize: '0.9rem',
                          color: colors.text.secondary,
                          fontWeight: 500,
                          '&:hover': { color: colors.primary.main },
                        }}
                      >
                        {contactInfo.phone}
                      </Link>
                      <Typography sx={{ color: colors.text.tertiary }}>ó</Typography>
                      <Link
                        href={`tel:${contactInfo.shortcode}`}
                        sx={{
                          fontSize: '0.9rem',
                          color: colors.text.secondary,
                          fontWeight: 500,
                          '&:hover': { color: colors.primary.main },
                        }}
                      >
                        {contactInfo.shortcode}
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: colors.border.default }} />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 2,
            }}
          >
            {/* Legal Links */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: { xs: 2, md: 4 },
              }}
            >
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: colors.text.tertiary,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: `color ${animation.duration.fast} ease`,
                    '&:hover': {
                      color: colors.primary.main,
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>

            {/* Copyright */}
            <Typography
              sx={{
                color: colors.text.tertiary,
                fontSize: '0.85rem',
                textAlign: { xs: 'center', md: 'right' },
              }}
            >
              © {new Date().getFullYear()} Intercel. Todos los derechos reservados.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
