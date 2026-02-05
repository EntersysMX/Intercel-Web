/**
 * FeaturesBanner Component - Key Benefits Section
 * Material Design 3 Feature Cards with animations
 */

import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Speed,
  Security,
  SupportAgent,
  PhoneIphone,
} from '@mui/icons-material';
import { colors, shadows, animation, borderRadius } from '../styles/designTokens';

const features = [
  {
    icon: <Speed sx={{ fontSize: 32 }} />,
    title: 'Alta Velocidad',
    description: 'Navega con la mejor velocidad de conexión en todo México',
  },
  {
    icon: <Security sx={{ fontSize: 32 }} />,
    title: 'Red Segura',
    description: 'Tu información siempre protegida con tecnología de punta',
  },
  {
    icon: <SupportAgent sx={{ fontSize: 32 }} />,
    title: 'Soporte 24/7',
    description: 'Atención al cliente disponible cuando lo necesites',
  },
  {
    icon: <PhoneIphone sx={{ fontSize: 32 }} />,
    title: 'eSIM Compatible',
    description: 'Activa tu plan sin chip físico, de forma instantánea',
  },
];

const FeaturesBanner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: colors.surface.background,
      }}
    >
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={feature.title}>
                <Box
                  component={motion.div}
                  variants={itemVariants}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: borderRadius['2xl'],
                    backgroundColor: colors.surface.card,
                    border: `1px solid ${colors.border.subtle}`,
                    boxShadow: shadows.sm,
                    transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
                    cursor: 'default',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: shadows.card.hover,
                      borderColor: colors.primary.light,
                      '& .feature-icon': {
                        backgroundColor: colors.primary.main,
                        color: 'white',
                        transform: 'scale(1.1) rotate(5deg)',
                      },
                    },
                  }}
                >
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: borderRadius.xl,
                      backgroundColor: colors.primary.surface,
                      color: colors.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      transition: `all ${animation.duration.normal} ${animation.easing.easeInOut}`,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: colors.text.primary,
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      color: colors.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesBanner;
