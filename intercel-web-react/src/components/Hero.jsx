/**
 * Hero Component - Premium Hero with Original Intercel Banner
 * Full-screen immersive experience with official banner image
 */

import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KeyboardArrowDown, Bolt } from '@mui/icons-material';
import { colors, shadows } from '../styles/designTokens';
import { images } from '../data/assets';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // Overlap navbar spacer to eliminate white line
        mt: { xs: '-64px', lg: '-80px' },
        pt: { xs: '64px', lg: '80px' },
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: {
            xs: `url(${images.bannerResponsive})`,
            md: `url(${images.bannerPlanes})`,
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient Overlay for better text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(180deg,
              rgba(4, 115, 132, 0.4) 0%,
              rgba(4, 115, 132, 0.5) 50%,
              rgba(3, 90, 104, 0.7) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Orbs with Blur */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
          sx={{
            position: 'absolute',
            width: { xs: 100 + i * 50, md: 200 + i * 80 },
            height: { xs: 100 + i * 50, md: 200 + i * 80 },
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(0, 198, 174, ${0.15 - i * 0.03}) 0%, transparent 70%)`,
            filter: 'blur(2px)',
            top: `${10 + i * 20}%`,
            left: `${5 + i * 25}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity, scale }}
          sx={{
            textAlign: 'center',
            color: 'white',
          }}
        >
          {/* Premium Badge */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{ mb: 4 }}
          >
            <Chip
              icon={<Bolt sx={{ fontSize: 16, color: '#FFD700 !important' }} />}
              label="La red más rápida de México"
              sx={{
                px: 2,
                py: 2.5,
                fontSize: '0.95rem',
                fontWeight: 600,
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: 'white',
                borderRadius: '100px',
                '& .MuiChip-icon': {
                  color: '#FFD700',
                },
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              }}
            />
          </Box>

          {/* Main Title - Clean & Refined */}
          <Typography
            component={motion.h1}
            variants={itemVariants}
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              mb: 2,
              color: 'white',
            }}
          >
            Nuestros Planes
          </Typography>

          {/* Subtitle - Elegant */}
          <Typography
            component={motion.p}
            variants={itemVariants}
            sx={{
              fontSize: { xs: '1.1rem', md: '1.35rem' },
              fontWeight: 400,
              maxWidth: 500,
              mx: 'auto',
              mb: 5,
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Conectividad sin límites, diseñada para ti.
            <br />
            <Box
              component="span"
              sx={{
                fontSize: '0.9em',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Activa tu eSIM en segundos.
            </Box>
          </Typography>

          {/* CTA Buttons - IMPROVED COLORS */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              href="#Planes"
              sx={{
                background: 'linear-gradient(135deg, #00C6AE 0%, #00E5C9 100%)',
                color: '#035A68',
                px: 5,
                py: 2,
                fontSize: '1.15rem',
                fontWeight: 700,
                borderRadius: '18px',
                boxShadow: '0 15px 40px rgba(0, 198, 174, 0.4)',
                textTransform: 'none',
                letterSpacing: '-0.01em',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00E5C9 0%, #00FFE0 100%)',
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: '0 25px 50px rgba(0, 198, 174, 0.5), 0 0 40px rgba(0, 229, 201, 0.4)',
                },
                '&:active': {
                  transform: 'translateY(-2px) scale(1.01)',
                },
              }}
            >
              Explorar planes
            </Button>
            <Button
              variant="contained"
              size="large"
              href="https://intercel.com.mx/comprar-esim/"
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: colors.primary.main,
                px: 4,
                py: 1.9,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '18px',
                textTransform: 'none',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
                },
              }}
            >
              Comprar eSIM
            </Button>
          </Box>

          {/* Trust Indicators */}
          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 3, md: 6 },
              mt: 8,
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '99.9%', label: 'Cobertura' },
              { value: '5G', label: 'Velocidad' },
              { value: '24/7', label: 'Soporte' },
            ].map((stat, index) => (
              <Box
                key={stat.label}
                sx={{
                  textAlign: 'center',
                  px: 3,
                  borderRight: index < 2 ? '1px solid rgba(255,255,255,0.25)' : 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    fontWeight: 800,
                    color: '#00C6AE',
                    lineHeight: 1,
                    textShadow: '0 2px 10px rgba(0, 198, 174, 0.4)',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.85)',
                    mt: 0.5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Scroll Indicator */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ y: y1 }}
        sx={{
          position: 'absolute',
          bottom: { xs: 30, md: 50 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <Box
          component="a"
          href="#Planes"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            textDecoration: 'none',
            opacity: 0.9,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              mb: 1.5,
            }}
          >
            Descubre
          </Typography>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Box
              sx={{
                width: 30,
                height: 50,
                borderRadius: '15px',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                pt: 1,
              }}
            >
              <Box
                component={motion.div}
                animate={{ y: [0, 15, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                sx={{
                  width: 4,
                  height: 10,
                  borderRadius: '2px',
                  backgroundColor: 'white',
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
