/**
 * FAQ Component - Frequently Asked Questions
 * Accordion style with smooth animations
 */

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Add, Remove } from '@mui/icons-material';

const faqs = [
  {
    question: '¿Qué es una eSIM y cómo funciona?',
    answer: 'Una eSIM es una tarjeta SIM digital integrada en tu dispositivo. No necesitas una tarjeta física, simplemente escaneas un código QR y activas tu plan de datos al instante. Es más segura, ecológica y conveniente.',
  },
  {
    question: '¿Mi celular es compatible con eSIM?',
    answer: 'La mayoría de smartphones modernos son compatibles: iPhone XS en adelante, Samsung Galaxy S20+, Google Pixel 3+, Huawei P40+, y más. Puedes verificar en los ajustes de tu dispositivo buscando la opción "Agregar plan celular" o "eSIM".',
  },
  {
    question: '¿Cuánto tiempo tarda en activarse?',
    answer: 'La activación es instantánea. Una vez que completas tu compra, recibes el código QR en tu correo en menos de 2 minutos. Solo escaneas, sigues los pasos y listo, ¡ya tienes conexión!',
  },
  {
    question: '¿Puedo conservar mi número actual?',
    answer: 'Sí, puedes portar tu número a Intercel. El proceso de portabilidad tarda entre 24 y 72 horas. También puedes usar la eSIM como línea secundaria manteniendo tu número actual en otra SIM.',
  },
  {
    question: '¿Qué cobertura tiene Intercel?',
    answer: 'Intercel opera con la red más grande de México, brindando cobertura 4G LTE y 5G en todo el país. Cubrimos más del 99% del territorio nacional incluyendo zonas rurales.',
  },
  {
    question: '¿Qué pasa si no uso todos mis datos?',
    answer: 'Tus datos no se pierden. Si recargas antes de que termine tu vigencia, los datos restantes se acumulan con tu nueva recarga. Queremos que aproveches cada megabyte.',
  },
  {
    question: '¿Cómo puedo contactar a soporte?',
    answer: 'Estamos disponibles 24/7 por WhatsApp, llamando al 55 8993 1510, marcando *233 desde tu línea Intercel, o por correo a contacto@intercel.com.mx. Nuestro tiempo promedio de respuesta es menor a 5 minutos.',
  },
  {
    question: '¿Es seguro comprar en línea?',
    answer: 'Totalmente. Utilizamos encriptación SSL de 256 bits y procesamos pagos a través de Stripe y PayPal, los sistemas más seguros del mundo. Tus datos están 100% protegidos.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      sx={{
        mb: 2,
        borderRadius: '16px',
        overflow: 'hidden',
        background: isOpen ? 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)' : 'white',
        border: isOpen ? 'none' : '1px solid rgba(0, 198, 174, 0.2)',
        boxShadow: isOpen ? '0 10px 40px rgba(4, 115, 132, 0.25)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Question */}
      <Box
        onClick={onToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          cursor: 'pointer',
          '&:hover': {
            background: isOpen ? 'transparent' : 'rgba(0, 198, 174, 0.05)',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            fontWeight: 600,
            color: isOpen ? 'white' : '#1a1a2e',
            pr: 2,
          }}
        >
          {faq.question}
        </Typography>
        <Box
          component={motion.div}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: isOpen ? 'rgba(255,255,255,0.2)' : 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {isOpen ? (
            <Remove sx={{ color: 'white', fontSize: 20 }} />
          ) : (
            <Add sx={{ color: 'white', fontSize: 20 }} />
          )}
        </Box>
      </Box>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ px: 3, pb: 3 }}>
              <Typography
                sx={{
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.7,
                }}
              >
                {faq.answer}
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Box
      component="section"
      id="FAQ"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FA 100%)',
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}
        >
          <Typography
            sx={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#00C6AE',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              mb: 2,
              px: 3,
              py: 1,
              borderRadius: '50px',
              background: 'rgba(0, 198, 174, 0.1)',
            }}
          >
            FAQ
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Preguntas Frecuentes
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.15rem' },
              color: '#666',
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            Resolvemos tus dudas para que compres con confianza
          </Typography>
        </Box>

        {/* FAQ Items */}
        <Box>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </Box>

        {/* Contact CTA */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{
            textAlign: 'center',
            mt: 6,
            p: 4,
            borderRadius: '20px',
            background: 'white',
            border: '1px solid rgba(0, 198, 174, 0.2)',
          }}
        >
          <Typography
            sx={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#1a1a2e',
              mb: 1,
            }}
          >
            ¿Tienes otra pregunta?
          </Typography>
          <Typography
            sx={{
              fontSize: '0.95rem',
              color: '#666',
              mb: 3,
            }}
          >
            Nuestro equipo está listo para ayudarte
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <Box
              component="a"
              href="https://wa.me/5589931510"
              target="_blank"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                borderRadius: '50px',
                background: '#25D366',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              WhatsApp
            </Box>
            <Box
              component="a"
              href="tel:5589931510"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 3,
                py: 1.5,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              55 8993 1510
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
