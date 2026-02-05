/**
 * Testimonials Component - Premium Social Proof Section
 * Modern carousel with glassmorphism cards
 */

import { Box, Container, Typography, Avatar, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FormatQuote } from '@mui/icons-material';
import { colors } from '../styles/designTokens';
import { images } from '../data/assets';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'María García',
    role: 'Emprendedora',
    avatar: images.persona1,
    rating: 5,
    text: 'Increíble servicio. La activación de mi eSIM fue instantánea y la cobertura es excelente en toda la ciudad. ¡100% recomendado!',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'Ingeniero de Software',
    avatar: images.persona2,
    rating: 5,
    text: 'Como desarrollador, necesito estar siempre conectado. Intercel me ofrece la velocidad y estabilidad que necesito para trabajar desde cualquier lugar.',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    role: 'Diseñadora UX',
    avatar: images.persona3,
    rating: 5,
    text: 'El proceso de compra es súper intuitivo y moderno. En menos de 5 minutos ya tenía mi línea activa. ¡Excelente experiencia!',
  },
  {
    id: 4,
    name: 'Roberto Sánchez',
    role: 'Fotógrafo',
    avatar: images.persona4,
    rating: 5,
    text: 'Viajo constantemente por trabajo y la cobertura de Intercel nunca me ha fallado. Las redes sociales ilimitadas son perfectas para mi contenido.',
  },
  {
    id: 5,
    name: 'Laura Hernández',
    role: 'Estudiante',
    avatar: images.persona5,
    rating: 5,
    text: 'Los precios son muy accesibles y la calidad del servicio es premium. Mis clases en línea nunca se interrumpen.',
  },
];

const Testimonials = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #047384 0%, #035A68 50%, #023D47 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 60% 40% at 10% 50%, rgba(0, 198, 174, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 90% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Shapes */}
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            width: 100 + i * 50,
            height: 100 + i * 50,
            borderRadius: '30%',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            top: `${20 + i * 20}%`,
            left: `${10 + i * 30}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 }, color: 'white' }}
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
            Testimonios
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
              fontWeight: 800,
              lineHeight: 1.15,
              mb: 2,
            }}
          >
            Lo que dicen nuestros usuarios
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              opacity: 0.8,
              maxWidth: 550,
              mx: 'auto',
            }}
          >
            Miles de mexicanos ya disfrutan de la mejor conectividad
          </Typography>

          {/* Stars Rating */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3 }}>
            <Box
              component="img"
              src={images.estrellas}
              alt="5 estrellas"
              sx={{ height: 24 }}
            />
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#00C6AE' }}>
              4.9/5 basado en +10,000 reseñas
            </Typography>
          </Box>
        </Box>

        {/* Testimonials Carousel */}
        <Box
          sx={{
            mx: { xs: -2, md: 0 },
            '.swiper': {
              pb: 8,
              px: { xs: 2, md: 4 },
            },
            '.swiper-slide': {
              height: 'auto',
            },
            '.swiper-pagination-bullet': {
              width: 10,
              height: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              opacity: 1,
              transition: 'all 0.3s ease',
            },
            '.swiper-pagination-bullet-active': {
              backgroundColor: '#00C6AE',
              width: 28,
              borderRadius: 5,
            },
            '.swiper-button-prev, .swiper-button-next': {
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              '&::after': {
                fontSize: 18,
                fontWeight: 'bold',
              },
              '&:hover': {
                backgroundColor: '#00C6AE',
              },
            },
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.5, centeredSlides: true },
              768: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 3, centeredSlides: false },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Box
                  component={motion.div}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.12)',
                      borderColor: 'rgba(0, 198, 174, 0.3)',
                    },
                  }}
                >
                  {/* Quote Icon */}
                  <FormatQuote
                    sx={{
                      fontSize: 40,
                      color: '#00C6AE',
                      opacity: 0.5,
                      mb: 2,
                      transform: 'rotate(180deg)',
                    }}
                  />

                  {/* Testimonial Text */}
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      color: 'white',
                      lineHeight: 1.7,
                      flex: 1,
                      mb: 3,
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>

                  {/* Rating */}
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    sx={{
                      mb: 2,
                      '& .MuiRating-iconFilled': {
                        color: '#FFD700',
                      },
                    }}
                  />

                  {/* User Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{
                        width: 50,
                        height: 50,
                        border: '2px solid rgba(0, 198, 174, 0.5)',
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'white',
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          color: '#00C6AE',
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
