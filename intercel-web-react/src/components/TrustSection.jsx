/**
 * TrustSection Component - Statistics & Trust Badges
 * Builds customer confidence with social proof
 */

import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import {
  People,
  Star,
  Verified,
  Speed,
  Support,
  Security,
  CreditCard,
  Lock,
} from '@mui/icons-material';

const stats = [
  {
    icon: People,
    value: '15,000+',
    label: 'Clientes Activos',
    color: '#00C6AE',
  },
  {
    icon: Star,
    value: '4.8',
    label: 'Calificación App Store',
    color: '#FFD700',
  },
  {
    icon: Speed,
    value: '99.9%',
    label: 'Uptime de Red',
    color: '#00C6AE',
  },
  {
    icon: Support,
    value: '24/7',
    label: 'Soporte al Cliente',
    color: '#00C6AE',
  },
];

const trustBadges = [
  {
    icon: Verified,
    title: 'Autorizado IFT',
    description: 'Operador certificado',
  },
  {
    icon: Security,
    title: 'Datos Protegidos',
    description: 'Encriptación SSL',
  },
  {
    icon: CreditCard,
    title: 'Pago Seguro',
    description: 'Stripe & PayPal',
  },
  {
    icon: Lock,
    title: 'Garantía',
    description: 'Satisfacción 100%',
  },
];

const TrustSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(180deg, #F8FFFE 0%, #FFFFFF 100%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Stats Row */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 3, md: 6 },
            mb: { xs: 6, md: 8 },
            pb: { xs: 6, md: 8 },
            borderBottom: '1px solid rgba(0, 198, 174, 0.15)',
          }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Box
                key={stat.label}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  textAlign: 'center',
                  minWidth: { xs: 140, sm: 160 },
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 1.5,
                    borderRadius: '16px',
                    background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent sx={{ fontSize: 28, color: stat.color }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 800,
                    color: '#047384',
                    lineHeight: 1,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#666',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Trust Badges */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              mb: 4,
            }}
          >
            Tu compra está protegida
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <Grid item xs={6} sm={3} key={badge.title}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      borderRadius: '20px',
                      background: 'white',
                      border: '1px solid rgba(0, 198, 174, 0.15)',
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                      '&:hover': {
                        borderColor: '#00C6AE',
                        boxShadow: '0 10px 40px rgba(0, 198, 174, 0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24, color: 'white' }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        mb: 0.5,
                      }}
                    >
                      {badge.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        color: '#666',
                      }}
                    >
                      {badge.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TrustSection;
