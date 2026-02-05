/**
 * PricingSection Component - Ultra Premium Plans Display
 * Apple-style section with stunning tabs and animations
 * Now fetches data from API
 */

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Tabs, Tab, Grid, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { CalendarToday, DateRange, Event, EventNote, CalendarMonth, Router } from '@mui/icons-material';
import PricingCard from './PricingCard';
import { getPlans } from '../services/api';
import { planCategories as fallbackCategories } from '../data/plans';
import { colors } from '../styles/designTokens';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const iconMap = {
  CalendarToday: <CalendarToday />,
  DateRange: <DateRange />,
  Event: <Event />,
  EventNote: <EventNote />,
  CalendarMonth: <CalendarMonth />,
  Router: <Router />,
};

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [planCategories, setPlanCategories] = useState(fallbackCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const data = await getPlans();
      if (data && data.length > 0) {
        setPlanCategories(data);
      }
    } catch (err) {
      console.error('Error loading plans, using fallback data:', err);
      setError(err);
      // Keep using fallback data
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const currentCategory = planCategories[activeTab];
  const plans = currentCategory?.plans || [];

  return (
    <Box
      id="Planes"
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        background: `
          linear-gradient(180deg,
            #FAFBFC 0%,
            #FFFFFF 30%,
            #F8FAFC 70%,
            #FFFFFF 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(4, 115, 132, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -300,
          right: -200,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 198, 174, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 800,
              color: colors.text.primary,
              lineHeight: 1.15,
              mb: 2,
              letterSpacing: '-0.03em',
            }}
          >
            ¡Activa tu plan{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #047384 0%, #00C6AE 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ahora
            </Box>
            !
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: colors.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Elige el plan perfecto que se adapta a tu estilo de vida
          </Typography>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: colors.primary.main }} />
          </Box>
        )}

        {!loading && (
          <>
            {/* Premium Tabs */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: { xs: 5, md: 7 },
              }}
            >
              <Box
                sx={{
                  background: 'white',
                  borderRadius: '24px',
                  p: 1,
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  overflowX: 'auto',
                  maxWidth: '100%',
                  '&::-webkit-scrollbar': {
                    height: 4,
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: colors.border.default,
                    borderRadius: 2,
                  },
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  TabIndicatorProps={{ style: { display: 'none' } }}
                  sx={{
                    minHeight: 'auto',
                    '& .MuiTabs-flexContainer': {
                      gap: 0.5,
                    },
                    '& .MuiTab-root': {
                      minHeight: 'auto',
                      minWidth: 'auto',
                      px: { xs: 2, md: 3 },
                      py: 1.5,
                      fontSize: { xs: '0.85rem', md: '0.95rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      color: colors.text.secondary,
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(4, 115, 132, 0.05)',
                      },
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #047384 0%, #0A9AB0 100%)',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(4, 115, 132, 0.35)',
                      },
                    },
                  }}
                >
                  {planCategories.map((category) => (
                    <Tab
                      key={category.id}
                      icon={iconMap[category.icon]}
                      iconPosition="start"
                      label={category.label}
                      disableRipple
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 18,
                          mr: 0.5,
                        },
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
            </Box>

            {/* Plans Grid - Desktop */}
            <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory?.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    sx={{ px: { md: 2 } }}
                  >
                    {plans.map((plan, index) => (
                      <Grid
                        item
                        key={plan.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <PricingCard plan={plan} index={index} categoryId={currentCategory?.id} />
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </AnimatePresence>
            </Box>

            {/* Plans Carousel - Mobile/Tablet */}
            <Box
              sx={{
                display: { xs: 'block', lg: 'none' },
                mx: -2,
                '.swiper': {
                  pb: 7,
                  px: 2,
                },
                '.swiper-slide': {
                  display: 'flex',
                  justifyContent: 'center',
                  height: 'auto',
                },
                '.swiper-pagination': {
                  bottom: 0,
                },
                '.swiper-pagination-bullet': {
                  width: 10,
                  height: 10,
                  backgroundColor: colors.border.strong,
                  opacity: 1,
                  transition: 'all 0.3s ease',
                },
                '.swiper-pagination-bullet-active': {
                  backgroundColor: colors.primary.main,
                  width: 28,
                  borderRadius: 5,
                },
                '.swiper-button-prev, .swiper-button-next': {
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                  color: colors.primary.main,
                  '&::after': {
                    fontSize: 18,
                    fontWeight: 'bold',
                  },
                  '&:hover': {
                    backgroundColor: colors.primary.main,
                    color: 'white',
                  },
                },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCategory?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1}
                    centeredSlides={true}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                      480: { slidesPerView: 1.2, centeredSlides: true },
                      640: { slidesPerView: 1.5, centeredSlides: true },
                      768: { slidesPerView: 2, centeredSlides: false },
                      900: { slidesPerView: 2.3, centeredSlides: false },
                    }}
                  >
                    {plans.map((plan, index) => (
                      <SwiperSlide key={plan.id}>
                        <PricingCard plan={plan} index={index} categoryId={currentCategory?.id} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </motion.div>
              </AnimatePresence>
            </Box>
          </>
        )}

        {/* Bottom Trust Badge */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mt: { xs: 6, md: 8 },
            flexWrap: 'wrap',
          }}
        >
          {['Sin contrato', 'Activación inmediata', 'Cancela cuando quieras'].map((item) => (
            <Box
              key={item}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                borderRadius: '100px',
                backgroundColor: 'rgba(4, 115, 132, 0.06)',
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: colors.secondary.main,
                }}
              />
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: colors.text.secondary,
                }}
              >
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default PricingSection;
