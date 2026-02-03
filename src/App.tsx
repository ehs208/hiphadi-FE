import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/user/Header';
import MenuPage from '@pages/user/MenuPage';
import Footer from '@components/user/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cart from '@components/user/Cart';
import PrivacyPolicy from '@pages/user/PrivacyPolicy';
import AdminDashboardPage from '@pages/admin/AdminDashboardPage';
import AdminLogin from '@pages/admin/AdminLogin';
import ProtectedRoute from '@components/ProtectedRoute';
import AdminMenuPage from '@pages/admin/AdminMenuPage';
import AdminStatisticsPage from '@pages/admin/AdminStatisticsPage';
import SuggestionPage from '@pages/user/SuggestionPage';
import AdminSuggestionsPage from '@pages/admin/AdminSuggestionsPage';
import AdminImagePage from '@pages/admin/AdminImagePage';
import AdminSiteSettingsPage from '@pages/admin/AdminSiteSettingsPage';
import NotFoundPage from '@pages/user/NotFoundPage';
import { ToastProvider } from '@context/ToastContext';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
        <div className="w-full">
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
            <Route path="/suggestions" element={<SuggestionPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/menu" element={<AdminMenuPage />} />
              <Route
                path="/admin/statistics"
                element={<AdminStatisticsPage />}
              />
              <Route path="/admin/images" element={<AdminImagePage />} />
              <Route
                path="/admin/suggestions"
                element={<AdminSuggestionsPage />}
              />
              <Route path="/admin/site-settings" element={<AdminSiteSettingsPage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        </ToastProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
