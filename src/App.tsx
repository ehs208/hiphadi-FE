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
import PopularMenuPage from '@components/admin/PopularMenu';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div>
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
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route
                path="/admin/menu/list/:situation"
                element={<AdminMenuPage />}
              />
              <Route
                path="/admin/popular-menus"
                element={<PopularMenuPage />}
              />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
