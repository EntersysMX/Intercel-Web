/**
 * Partners Component - Network Coverage & Partners
 * Shows network partners and coverage logos
 */

import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  SignalCellularAlt,
  Speed,
  Public,
  Verified,
} from '@mui/icons-material';

const networkFeatures = [
  {
    icon: SignalCellularAlt,
    title: 'Red 4G LTE & 5G',
    description: 'Velocidades hasta 500 Mbps',
  },
  {
    icon: Public,
    title: 'Cobertura Nacional',
    description: '+99% del territorio',
  },
  {
    icon: Speed,
    title: 'Sin Throttling',
    description: 'Velocidad máxima siempre',
  },
  {
    icon: Verified,
    title: 'Red Premium',
    description: 'Infraestructura de clase mundial',
  },
];

const Partners = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        background: '#FFFFFF',
        borderTop: '1px solid rgba(0, 198, 174, 0.1)',
        borderBottom: '1px solid rgba(0, 198, 174, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}
        >
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#999',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              mb: 2,
            }}
          >
            Nuestra Red
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.3,
              mb: 1,
            }}
          >
            La mejor cobertura de México
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: '#666',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            Operamos con la infraestructura de red más grande del país
          </Typography>
        </Box>

        {/* Network Logos - Visual representation */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
            mb: { xs: 5, md: 7 },
            flexWrap: 'wrap',
          }}
        >
          {/* Network Visual Badges */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 4,
              py: 2,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
              border: '1px solid #e0e0e0',
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #E20074 0%, #FF4081 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>
                T
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1rem' }}>
                Red Telcel
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#666' }}>
                Cobertura 4G/5G
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 4,
              py: 2,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
              border: '1px solid #e0e0e0',
            }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #009FDB 0%, #00C4FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '0.9rem' }}>
                AT&T
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1rem' }}>
                Red AT&T
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#666' }}>
                Roaming incluido
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Coverage Features Grid */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {networkFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Box
                key={feature.title}
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 3,
                  py: 2,
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(0, 198, 174, 0.08) 0%, rgba(4, 115, 132, 0.05) 100%)',
                  border: '1px solid rgba(0, 198, 174, 0.15)',
                  minWidth: { xs: '100%', sm: 'auto' },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent sx={{ fontSize: 22, color: 'white' }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#1a1a2e',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      color: '#666',
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Bottom Trust Text */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          sx={{
            textAlign: 'center',
            mt: 6,
            pt: 4,
            borderTop: '1px solid rgba(0, 198, 174, 0.1)',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: '#888',
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Intercel es un operador móvil virtual (OMV) autorizado por el{' '}
            <Box component="span" sx={{ fontWeight: 600, color: '#047384' }}>
              Instituto Federal de Telecomunicaciones (IFT)
            </Box>
            , operando legalmente en México desde 2020.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Partners;
