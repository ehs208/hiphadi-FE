import React from 'react';
import './App.css';
import Header from '@components/user/Header';
import MenuPage from '@pages/user/MenuPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cart from '@components/user/Cart';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <MenuPage></MenuPage>
        <Cart></Cart>
      </QueryClientProvider>
    </div>
  );
};

export default App;
