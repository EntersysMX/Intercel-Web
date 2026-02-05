/**
 * AppDownload Component - Premium App Promotion Section
 * Silicon Valley-style floating device mockup
 */

import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { PhoneIphone, Speed, Notifications, Security, TouchApp } from '@mui/icons-material';
import { colors } from '../styles/designTokens';
import { images } from '../data/assets';

const appFeatures = [
  {
    icon: <Speed />,
    title: 'Control Total',
    description: 'Monitorea tu consumo de datos en tiempo real',
  },
  {
    icon: <Notifications />,
    title: 'Alertas Smart',
    description: 'Notificaciones inteligentes de tu saldo',
  },
  {
    icon: <Security />,
    title: 'Seguridad Máxima',
    description: 'Protección avanzada de tus datos',
  },
  {
    icon: <TouchApp />,
    title: 'Recargas Fáciles',
    description: 'Recarga en segundos desde la app',
  },
];

const AppDownload = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Gradient Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4, 115, 132, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 198, 174, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  fontWeight: 700,
                  color: '#00C6AE',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  mb: 2,
                }}
              >
                App Móvil
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3rem' },
                  fontWeight: 800,
                  color: colors.text.primary,
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                Tu conexión en la{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #047384, #00C6AE)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  palma de tu mano
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: colors.text.secondary,
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                Descarga la app de Intercel y gestiona tu plan, recargas y consumo desde cualquier lugar. Disponible para iOS y Android.
              </Typography>

              {/* App Features Grid */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                {appFeatures.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '12px',
                          background: 'linear-gradient(135deg, rgba(4, 115, 132, 0.1), rgba(0, 198, 174, 0.1))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Box sx={{ color: colors.primary.main, '& .MuiSvgIcon-root': { fontSize: 20 } }}>
                          {feature.icon}
                        </Box>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: colors.text.primary,
                            mb: 0.3,
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            color: colors.text.secondary,
                            lineHeight: 1.4,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* App Store Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box
                  component={motion.a}
                  href="https://apps.apple.com/mx/app/intercel/id6749247365"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    display: 'block',
                    transition: 'box-shadow 0.3s ease',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={images.appStore}
                    alt="Download on App Store"
                    sx={{ height: 50, display: 'block' }}
                  />
                </Box>
                <Box
                  component={motion.a}
                  href="https://play.google.com/store/apps/details?id=io.ionic.intercel"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    display: 'block',
                    transition: 'box-shadow 0.3s ease',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={images.playStore}
                    alt="Get it on Google Play"
                    sx={{ height: 50, display: 'block' }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Right - Phone Mockup */}
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {/* Glow Effect */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 300,
                  height: 300,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 198, 174, 0.2) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Phone Image */}
              <Box
                component={motion.div}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box
                  component="img"
                  src={images.mockupCel}
                  alt="Intercel App"
                  sx={{
                    maxWidth: { xs: 280, md: 350 },
                    width: '100%',
                    filter: 'drop-shadow(0 40px 80px rgba(4, 115, 132, 0.25))',
                  }}
                />

                {/* Floating Badge - Top */}
                <Box
                  component={motion.div}
                  animate={{
                    y: [0, -8, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  sx={{
                    position: 'absolute',
                    top: '15%',
                    right: { xs: -20, md: -40 },
                    background: 'white',
                    borderRadius: '16px',
                    p: 2,
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #00C6AE, #047384)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Speed sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.7rem', color: colors.text.secondary }}>
                      Velocidad
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: colors.text.primary }}>
                      500 Mbps
                    </Typography>
                  </Box>
                </Box>

                {/* Floating Badge - Bottom */}
                <Box
                  component={motion.div}
                  animate={{
                    y: [0, 8, 0],
                    rotate: [2, -2, 2],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  sx={{
                    position: 'absolute',
                    bottom: '25%',
                    left: { xs: -20, md: -50 },
                    background: 'linear-gradient(135deg, #047384, #00C6AE)',
                    borderRadius: '16px',
                    p: 2,
                    boxShadow: '0 15px 40px rgba(4, 115, 132, 0.3)',
                    color: 'white',
                  }}
                >
                  <Typography sx={{ fontSize: '0.7rem', opacity: 0.9 }}>
                    Datos restantes
                  </Typography>
                  <Typography sx={{ fontSize: '1.2rem', fontWeight: 800 }}>
                    15.4 GB
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AppDownload;
