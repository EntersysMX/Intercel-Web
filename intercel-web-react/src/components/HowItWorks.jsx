/**
 * HowItWorks Component - Premium Steps Section
 * Silicon Valley-style animated step-by-step guide
 */

import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { colors } from '../styles/designTokens';
import { images } from '../data/assets';

const steps = [
  {
    number: 1,
    title: 'Elige tu plan',
    description: 'Selecciona el plan perfecto que se adapte a tus necesidades.',
    image: images.paso1,
  },
  {
    number: 2,
    title: 'Compra tu eSIM',
    description: 'Proceso 100% digital, seguro y en menos de 2 minutos.',
    image: images.paso2,
  },
  {
    number: 3,
    title: 'Recibe tu QR',
    description: 'Recibirás tu código de activación al instante.',
    image: images.paso3,
  },
  {
    number: 4,
    title: 'Escanea y activa',
    description: 'Escanea el QR desde los ajustes de tu dispositivo.',
    image: images.paso4,
  },
  {
    number: 5,
    title: '¡Listo!',
    description: 'Disfruta de la mejor conectividad nacional.',
    image: images.paso5,
  },
];

const HowItWorks = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FA 50%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 198, 174, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}
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
            Proceso Simple
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
              fontWeight: 800,
              color: colors.text.primary,
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            ¿Cómo funciona?
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: colors.text.secondary,
              maxWidth: 550,
              mx: 'auto',
            }}
          >
            Activa tu eSIM en 5 sencillos pasos
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={6} sm={4} md key={step.number}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {/* Connection Line - Desktop */}
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      position: 'absolute',
                      top: 55,
                      right: { md: -30, lg: -40 },
                      width: { md: 60, lg: 80 },
                      height: 3,
                      background: 'linear-gradient(90deg, #00C6AE 0%, rgba(0, 198, 174, 0.2) 100%)',
                      borderRadius: 2,
                    }}
                  />
                )}

                {/* Step Number Circle */}
                <Box
                  sx={{
                    width: 110,
                    height: 110,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #047384 0%, #00C6AE 100%)',
                    boxShadow: '0 15px 40px rgba(4, 115, 132, 0.35), 0 5px 15px rgba(0, 198, 174, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Large Number */}
                  <Typography
                    sx={{
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: 'white',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </Typography>
                </Box>

                {/* Step Icon - Small */}
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)',
                    boxShadow: '0 8px 25px rgba(4, 115, 132, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    p: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={step.image}
                    alt={step.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                </Box>

                {/* Step Content */}
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: colors.text.primary,
                    mb: 0.5,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: colors.text.secondary,
                    lineHeight: 1.5,
                    px: 1,
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
