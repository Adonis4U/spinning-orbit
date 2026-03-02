import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import {
  ThemeProvider,
  LanguageProvider,
  VenusProfileProvider,
  AuthProvider,
  useTheme,
  useLanguage,
} from './contexts';
import { Layout } from './components/layout';
import { routes, adminRoutes, preloadCriticalPages } from './router';
import { useCartItemCount } from './stores';

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Inner app component that has access to contexts
function AppContent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const cartItemsCount = useCartItemCount();

  // Preload critical pages on mount
  useEffect(() => {
    preloadCriticalPages();
  }, []);

  return (
    <>
      {/* Global SEO defaults */}
      <Helmet>
        <html lang={language} data-theme={resolvedTheme} />
        <title>House of Venus | Astrological Fashion</title>
        <meta
          name="description"
          content={
            language === 'en'
              ? 'Discover your cosmic style with House of Venus. Fashion inspired by Venus signs, zodiac collections, and astrology-driven looks.'
              : 'Odkryj swój kosmiczny styl z House of Venus. Moda inspirowana znakami Wenus, kolekcjami zodiakalnymi i stylizacjami astrologicznymi.'
          }
        />
        <meta property="og:site_name" content="House of Venus" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://houseofvenus.com" />
      </Helmet>

      <Routes>
        {/* Admin routes — separate layout (no site header/footer) */}
        <Route path={adminRoutes.path} element={adminRoutes.element}>
          {adminRoutes.children.map((child, idx) => (
            child.index
              ? <Route key={idx} index element={child.element} />
              : <Route key={idx} path={child.path} element={child.element} />
          ))}
        </Route>

        {/* Main site routes — with standard Layout (header + footer) */}
        <Route
          element={
            <Layout
              language={language}
              onLanguageChange={setLanguage}
              theme={theme}
              onThemeChange={setTheme}
              cartItemsCount={cartItemsCount}
            />
          }
        >
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </>
  );
}

// Main App component with all providers
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider defaultLanguage="en">
          <VenusProfileProvider>
            <AuthProvider>
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </AuthProvider>
          </VenusProfileProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
