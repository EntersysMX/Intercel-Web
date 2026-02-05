/**
 * HowItWorks Component - Premium Steps Section
 * Modern design with glassmorphism and animations
 */

import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  TouchApp,
  ShoppingCart,
  QrCode2,
  PhonelinkSetup,
  Celebration,
} from '@mui/icons-material';

const steps = [
  {
    number: 1,
    title: 'Elige tu plan',
    description: 'Selecciona el plan perfecto para ti',
    icon: TouchApp,
  },
  {
    number: 2,
    title: 'Compra tu eSIM',
    description: 'Proceso 100% digital y seguro',
    icon: ShoppingCart,
  },
  {
    number: 3,
    title: 'Recibe tu QR',
    description: 'Al instante en tu correo',
    icon: QrCode2,
  },
  {
    number: 4,
    title: 'Escanea y activa',
    description: 'Desde ajustes de tu celular',
    icon: PhonelinkSetup,
  },
  {
    number: 5,
    title: '¡Listo!',
    description: 'Disfruta tu conexión',
    icon: Celebration,
  },
];

const HowItWorks = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #047384 0%, #035A68 50%, #023D47 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 198, 174, 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        sx={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 201, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            component={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            sx={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#00E5C9',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              mb: 2,
              px: 3,
              py: 1,
              borderRadius: '50px',
              background: 'rgba(0, 229, 201, 0.1)',
              border: '1px solid rgba(0, 229, 201, 0.3)',
            }}
          >
            Proceso Simple
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Activa tu eSIM en minutos
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: 450,
              mx: 'auto',
            }}
          >
            Solo 5 pasos para conectarte
          </Typography>
        </Box>

        {/* Steps - Horizontal Timeline */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'center',
            gap: { xs: 3, md: 0 },
            position: 'relative',
          }}
        >
          {/* Connection Line - Desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 45,
              left: '12%',
              right: '12%',
              height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(0, 229, 201, 0.5), rgba(0, 229, 201, 0.5), transparent)',
            }}
          />

          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Box
                key={step.number}
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  flex: { md: 1 },
                  maxWidth: { xs: 280, md: 'none' },
                  textAlign: 'center',
                  px: { md: 2 },
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {/* Icon Circle */}
                <Box
                  component={motion.div}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 40px rgba(0, 229, 201, 0.6)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  sx={{
                    width: 90,
                    height: 90,
                    mx: 'auto',
                    mb: 2.5,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(0, 229, 201, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Number Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00E5C9 0%, #00C6AE 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(0, 229, 201, 0.5)',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        color: '#023D47',
                      }}
                    >
                      {step.number}
                    </Typography>
                  </Box>

                  <IconComponent
                    sx={{
                      fontSize: 38,
                      color: '#00E5C9',
                      filter: 'drop-shadow(0 2px 8px rgba(0, 229, 201, 0.4))',
                    }}
                  />
                </Box>

                {/* Content */}
                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'white',
                    mb: 0.5,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </Typography>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <Box
                    component={motion.div}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      mt: 2,
                      color: 'rgba(0, 229, 201, 0.5)',
                      fontSize: '1.5rem',
                    }}
                  >
                    ↓
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Bottom CTA */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          sx={{
            textAlign: 'center',
            mt: { xs: 6, md: 8 },
          }}
        >
          <Box
            component={motion.a}
            href="#Planes"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 4,
              py: 1.5,
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #00E5C9 0%, #00C6AE 100%)',
              color: '#023D47',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0, 229, 201, 0.4)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 15px 40px rgba(0, 229, 201, 0.5)',
              },
            }}
          >
            Comenzar ahora
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
