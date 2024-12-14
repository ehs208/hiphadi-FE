import React from 'react';
import './App.css';
import { useEffect } from 'react';
import {
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Header from '@components/user/Header';
import MenuPage from '@pages/user/MenuPage';
import Footer from '@components/user/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cart from '@components/user/Cart';
import PrivacyPolicy from '@pages/user/PrivacyPolicy';
import AdminDashboard from '@pages/admin/AdminDashboard';
import AdminLogin from '@pages/admin/AdminLogin';
import ProtectedRoute from '@components/ProtectedRoute';

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
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
