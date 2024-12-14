import React from 'react';
import './App.css';
import Header from '@components/user/Header';
import MenuPage from '@pages/user/MenuPage';
import Footer from '@components/user/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cart from '@components/user/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivacyPolicy from '@pages/user/PrivacyPolicy';
import AdminDashboard from '@pages/admin/AdminDashboard';
import AdminLogin from '@pages/admin/AdminLogin';

const queryClient = new QueryClient();

const App: React.FC = () => {
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
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  );
};

export default App;
