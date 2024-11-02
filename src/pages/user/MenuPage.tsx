import React from 'react';
import ProductList from '../../components/user/ProductList';

const MenuPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden">
      {/*<Tabs />*/}
      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default MenuPage;
