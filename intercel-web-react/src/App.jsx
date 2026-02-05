/**
 * Intercel Plans Page - Main Application
 * Built with React, Material Design 3, and Framer Motion
 * Silicon Valley-grade design system
 */

import { ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';
import {
  Navbar,
  Hero,
  FeaturesBanner,
  HowItWorks,
  PricingSection,
  Testimonials,
  AppDownload,
  CTASection,
  TrustSection,
  FAQ,
  Partners,
  Footer,
  WhatsAppButton,
} from './components';
import muiTheme from './styles/muiTheme';
import { globalStyles } from './styles/globalStyles';

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <Box component="main" sx={{ flex: 1 }}>
          {/* Hero Section */}
          <Hero />

          {/* Pricing Plans Section - FIRST after banner */}
          <PricingSection />

          {/* Trust Badges */}
          <TrustSection />

          {/* Features Banner */}
          <FeaturesBanner />

          {/* How It Works - Steps */}
          <HowItWorks />

          {/* Partners & Coverage */}
          <Partners />

          {/* Testimonials */}
          <Testimonials />

          {/* FAQ Section */}
          <FAQ />

          {/* App Download */}
          <AppDownload />

          {/* Call to Action */}
          <CTASection />
        </Box>

        {/* Footer */}
        <Footer />

        {/* WhatsApp Floating Button */}
        <WhatsAppButton />
      </Box>
    </ThemeProvider>
  );
}

export default App;
