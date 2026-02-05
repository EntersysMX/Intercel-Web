/**
 * PricingCard Component - 3D Flip Card with Silicon Valley UX
 * Premium flip effect revealing detailed info on back
 */

import { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Sms,
  AccessTime,
  Phone,
  Wifi,
  Star,
  LocalOffer,
  Speed,
  Security,
  Support,
  Public,
  Verified,
} from '@mui/icons-material';
import { colors } from '../styles/designTokens';
import { images } from '../data/assets';

const PricingCard = ({ plan, index = 0, categoryId = 'daily' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isFeatured = plan.featured;
  const isMifi = plan.isMifi || categoryId === 'mifi';

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.08,
        ease: 'easeOut',
      },
    },
  };

  // Back side features
  const backFeatures = [
    { icon: <Speed />, text: 'Velocidad 5G', desc: 'Hasta 500 Mbps' },
    { icon: <Public />, text: 'Cobertura Nacional', desc: '99.9% del territorio' },
    { icon: <Security />, text: 'Red Segura', desc: 'Encriptación avanzada' },
    { icon: <Support />, text: 'Soporte 24/7', desc: 'Atención personalizada' },
  ];

  // Feature items for front
  const getFeatures = () => {
    const features = [];
    if (isMifi) {
      features.push({ icon: <Wifi />, text: plan.features });
      features.push({ icon: <AccessTime />, text: plan.duration });
    } else {
      if (plan.calls) {
        features.push({ icon: <Phone />, text: 'Llamadas ilimitadas', highlight: true });
      }
      if (plan.unlimitedSocial) {
        features.push({ icon: <CheckCircle />, text: 'Redes Sociales Ilimitadas' });
      }
      if (plan.sms) {
        features.push({ icon: <Sms />, text: plan.sms });
      }
      features.push({ icon: <AccessTime />, text: plan.duration });
    }
    return features;
  };

  return (
    <Box
      component={motion.div}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped(!isFlipped)}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 300,
        minWidth: 260,
        height: 480,
        perspective: '1500px',
        cursor: 'pointer',
      }}
    >
      {/* 3D Card Container */}
      <Box
        component={motion.div}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ============ FRONT SIDE ============ */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '24px',
            overflow: 'hidden',
            backgroundColor: 'white',
            border: isFeatured ? '2px solid #00C6AE' : '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: isFeatured
              ? '0 20px 50px rgba(0, 198, 174, 0.25)'
              : '0 10px 40px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Promo Tag Banner */}
          {plan.tag && (
            <Box
              sx={{
                background: 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)',
                py: 0.8,
                px: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
              }}
            >
              <LocalOffer sx={{ fontSize: 12, color: 'white' }} />
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {plan.tag}
              </Typography>
            </Box>
          )}

          {/* Featured Badge */}
          {isFeatured && !plan.tag && (
            <Box
              sx={{
                background: 'linear-gradient(135deg, #00C6AE 0%, #00E5C9 100%)',
                py: 0.6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
              }}
            >
              <Star sx={{ fontSize: 12, color: '#035A68' }} />
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#035A68',
                  textTransform: 'uppercase',
                }}
              >
                Más Popular
              </Typography>
            </Box>
          )}

          {/* Card Content */}
          <Box sx={{ p: 2.5, height: 'calc(100% - 40px)', display: 'flex', flexDirection: 'column' }}>
            {/* Data Amount */}
            <Box sx={{ textAlign: 'center', mb: 1.5 }}>
              {plan.originalData && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 0.3 }}>
                  <Typography sx={{ fontSize: '0.85rem', color: colors.text.tertiary, textDecoration: 'line-through' }}>
                    {plan.originalData}
                  </Typography>
                  <Chip
                    label={plan.multiplier}
                    size="small"
                    sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, backgroundColor: '#00C6AE', color: 'white' }}
                  />
                </Box>
              )}
              <Typography
                sx={{
                  fontSize: isMifi ? '1.6rem' : '2.4rem',
                  fontWeight: 800,
                  color: colors.primary.main,
                  lineHeight: 1,
                }}
              >
                {plan.data}
              </Typography>
              {!isMifi && (
                <Typography sx={{ fontSize: '0.75rem', color: colors.text.secondary, fontWeight: 500 }}>
                  de datos
                </Typography>
              )}
            </Box>

            {/* Price */}
            <Box sx={{ textAlign: 'center', py: 1.5, mb: 1.5, borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: colors.text.secondary, mr: 0.2 }}>$</Typography>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: colors.text.primary, lineHeight: 1 }}>
                  {plan.price}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, color: colors.text.tertiary, ml: 0.3 }}>MXN</Typography>
              </Box>
            </Box>

            {/* Social Icons */}
            {!isMifi && plan.unlimitedSocial && (
              <Box sx={{ mb: 1.5 }}>
                <Box
                  component="img"
                  src={images.redesSociales}
                  alt="Redes Sociales"
                  sx={{ width: '100%', maxWidth: 160, mx: 'auto', display: 'block', opacity: 0.9 }}
                />
              </Box>
            )}

            {/* Features */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2, flex: 1 }}>
              {getFeatures().slice(0, 3).map((feature, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '6px',
                      backgroundColor: feature.highlight ? '#10B981' : 'rgba(4, 115, 132, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box sx={{ color: feature.highlight ? 'white' : colors.primary.main, '& .MuiSvgIcon-root': { fontSize: 14 } }}>
                      {feature.icon}
                    </Box>
                  </Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: feature.highlight ? '#10B981' : colors.text.primary }}>
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Flip Hint */}
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '0.7rem',
                color: colors.text.tertiary,
                mb: 1,
                opacity: 0.7,
                display: { xs: 'none', md: 'block' },
              }}
            >
              Pasa el mouse para ver más
            </Typography>
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: '0.7rem',
                color: colors.text.tertiary,
                mb: 1,
                opacity: 0.7,
                display: { xs: 'block', md: 'none' },
              }}
            >
              Toca para ver más
            </Typography>

            {/* CTA Button */}
            <Button
              fullWidth
              variant="contained"
              href="https://intercel.com.mx/comprar-esim/"
              onClick={(e) => e.stopPropagation()}
              sx={{
                py: 1.2,
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'none',
                background: isFeatured
                  ? 'linear-gradient(135deg, #00C6AE 0%, #00E5C9 100%)'
                  : 'linear-gradient(135deg, #047384 0%, #0A9AB0 100%)',
                color: isFeatured ? '#035A68' : 'white',
                boxShadow: '0 6px 20px rgba(4, 115, 132, 0.25)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 30px rgba(4, 115, 132, 0.35)',
                },
              }}
            >
              {isMifi ? 'Comprar MIFI' : 'Contratar'}
            </Button>
          </Box>
        </Box>

        {/* ============ BACK SIDE ============ */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '24px',
            overflow: 'hidden',
            background: 'linear-gradient(145deg, #047384 0%, #035A68 50%, #0A9AB0 100%)',
            border: '2px solid rgba(0, 198, 174, 0.3)',
            boxShadow: '0 25px 60px rgba(4, 115, 132, 0.4)',
          }}
        >
          {/* Back Content */}
          <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', color: 'white' }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography sx={{ fontSize: '1.8rem', fontWeight: 800, mb: 0.5 }}>
                {plan.data}
              </Typography>
              <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: '#00C6AE' }}>
                ${plan.price}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {plan.duration}
              </Typography>
            </Box>

            {/* Divider */}
            <Box sx={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', mb: 2 }} />

            {/* Benefits Grid */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1.5, opacity: 0.8 }}>
                Beneficios Incluidos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {backFeatures.map((feature, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(0, 198, 174, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Box sx={{ color: '#00C6AE', '& .MuiSvgIcon-root': { fontSize: 18 } }}>
                        {feature.icon}
                      </Box>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        {feature.text}
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem', opacity: 0.7 }}>
                        {feature.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Verified Badge */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2, mb: 2 }}>
              <Verified sx={{ color: '#00C6AE', fontSize: 18 }} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                Activación inmediata garantizada
              </Typography>
            </Box>

            {/* CTA Button */}
            <Button
              fullWidth
              variant="contained"
              href="https://intercel.com.mx/comprar-esim/"
              onClick={(e) => e.stopPropagation()}
              sx={{
                py: 1.3,
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: 'white',
                color: colors.primary.main,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: '#00C6AE',
                  color: '#035A68',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Activar Ahora
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Floating Glow Effect */}
      {isFeatured && (
        <Box
          sx={{
            position: 'absolute',
            inset: -4,
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #00C6AE 0%, #047384 100%)',
            opacity: isFlipped ? 0.3 : 0.15,
            filter: 'blur(20px)',
            zIndex: -1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}
    </Box>
  );
};

export default PricingCard;
