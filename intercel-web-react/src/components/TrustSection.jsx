/**
 * TrustSection Component - Trust Badges Only
 * Builds customer confidence with security badges
 */

import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import {
  Verified,
  Security,
  CreditCard,
  Lock,
} from '@mui/icons-material';

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
        py: { xs: 5, md: 6 },
        background: '#FFFFFF',
      }}
    >
      <Container maxWidth="lg">
        {/* Trust Badges */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
