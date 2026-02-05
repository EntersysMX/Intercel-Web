/**
 * CTASection Component - Premium Call to Action
 * Ultra-modern Silicon Valley design with immersive visuals
 */

import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import {
  RocketLaunch,
  Verified,
  Speed,
  SupportAgent,
  CreditCard,
  Bolt,
} from '@mui/icons-material';
import { colors } from '../styles/designTokens';
import { images } from '../data/assets';

const benefits = [
  { icon: <Verified />, text: 'Sin contratos' },
  { icon: <Speed />, text: 'Activación inmediata' },
  { icon: <SupportAgent />, text: 'Soporte 24/7' },
  { icon: <CreditCard />, text: 'Pago seguro' },
];

const CTASection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 12, md: 16 },
        overflow: 'hidden',
      }}
    >
      {/* Background with Image and Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${images.bannerHome})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(135deg,
              rgba(4, 115, 132, 0.95) 0%,
              rgba(3, 90, 104, 0.9) 40%,
              rgba(0, 198, 174, 0.85) 100%
            )
          `,
        }}
      />

      {/* Animated Shapes */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
          sx={{
            position: 'absolute',
            width: { xs: 80 + i * 40, md: 150 + i * 60 },
            height: { xs: 80 + i * 40, md: 150 + i * 60 },
            borderRadius: '30%',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: `radial-gradient(circle, rgba(255, 255, 255, ${0.03 - i * 0.005}) 0%, transparent 70%)`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 18}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Glowing Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 198, 174, 0.3) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={7}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2.5,
                  py: 1,
                  mb: 3,
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Bolt sx={{ color: '#FFD700', fontSize: 18 }} />
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  Oferta por tiempo limitado
                </Typography>
              </Box>

              {/* Title */}
              <Typography
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1.1,
                  mb: 2,
                }}
              >
                ¿Listo para{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #00E5C9 0%, #FFD700 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  conectarte
                </Box>
                ?
              </Typography>

              {/* Subtitle */}
              <Typography
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  maxWidth: 500,
                  lineHeight: 1.6,
                }}
              >
                Únete a miles de mexicanos que ya disfrutan de la mejor red móvil. Obtén tu eSIM en minutos.
              </Typography>

              {/* Benefits Row */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 5,
                }}
              >
                {benefits.map((benefit, index) => (
                  <Box
                    key={index}
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(5px)',
                    }}
                  >
                    <Box sx={{ color: '#00C6AE', '& .MuiSvgIcon-root': { fontSize: 18 } }}>
                      {benefit.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'white',
                      }}
                    >
                      {benefit.text}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  href="https://intercel.com.mx/comprar-esim/"
                  startIcon={<RocketLaunch />}
                  component={motion.a}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    background: 'linear-gradient(135deg, #00E5C9 0%, #00C6AE 100%)',
                    color: '#035A68',
                    px: 4,
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '16px',
                    boxShadow: '0 15px 40px rgba(0, 229, 201, 0.4)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00FFE0 0%, #00E5C9 100%)',
                      boxShadow: '0 20px 50px rgba(0, 229, 201, 0.5)',
                    },
                  }}
                >
                  Comprar eSIM Ahora
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  href="https://intercel.com.mx/planes/"
                  component={motion.a}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: colors.primary.main,
                    px: 4,
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '16px',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
                    textTransform: 'none',
                    '&:hover': {
                      background: 'white',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  Ver Todos los Planes
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right - Visual Element */}
          <Grid item xs={12} md={5}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Floating Card */}
              <Box
                component={motion.div}
                animate={{
                  y: [0, -15, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'relative',
                  width: 280,
                  height: 380,
                  borderRadius: '30px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Logo */}
                <Box
                  component="img"
                  src={images.logo}
                  alt="Intercel"
                  sx={{
                    width: 140,
                    filter: 'brightness(0) invert(1)',
                    mb: 4,
                  }}
                />

                {/* eSIM Visual */}
                <Box
                  sx={{
                    width: 100,
                    height: 70,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: '#333',
                    }}
                  >
                    eSIM
                  </Typography>
                </Box>

                {/* Status */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 3,
                    py: 1.5,
                    borderRadius: '100px',
                    background: 'rgba(0, 198, 174, 0.3)',
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#00C6AE',
                      boxShadow: '0 0 10px #00C6AE',
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                        '50%': { opacity: 0.7, transform: 'scale(1.2)' },
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    Listo para activar
                  </Typography>
                </Box>

                {/* Decorative Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00C6AE 0%, #047384 100%)',
                    opacity: 0.5,
                    filter: 'blur(20px)',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -15,
                    left: -15,
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    opacity: 0.4,
                    filter: 'blur(15px)',
                  }}
                />
              </Box>

              {/* Floating Stats */}
              <Box
                component={motion.div}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                sx={{
                  position: 'absolute',
                  top: '20%',
                  right: '5%',
                  background: 'white',
                  borderRadius: '16px',
                  p: 2,
                  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Typography sx={{ fontSize: '0.7rem', color: colors.text.secondary }}>
                  Usuarios activos
                </Typography>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: colors.primary.main }}>
                  +50,000
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CTASection;
