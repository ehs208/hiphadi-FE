import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from '@components/user/Header';
import MenuPage from '@pages/user/MenuPage';
import Footer from '@components/user/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cart from '@components/user/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivacyPolicy from '@pages/user/PrivacyPolicy';
import AdminDashboard from '@pages/admin/AdminDashboard';
import AdminLogin from '@pages/admin/AdminLogin';
import ProtectedRoute from '@components/ProtectedRoute';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const location = useLocation(); // 현재 경로 추적

  useEffect(() => {
    const manifestLink = document.querySelector('link[rel="manifest"]');

    if (location.pathname.startsWith('/admin')) {
      manifestLink?.setAttribute('href', '%PUBLIC_URL%/admin/manifest.json');
    } else {
      manifestLink?.setAttribute('href', '%PUBLIC_URL%/manifest.json');
    }
  }, [location.pathname]);
  return (
    <div>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <MenuPage />
                  <Cart />
                  <Footer />
                </>
              }
            />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  );
};

export default App;
