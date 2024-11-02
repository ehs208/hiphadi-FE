import React, { useState } from 'react';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminMenuItemList from '../../components/admin/AdminMenuItemList';

interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
}

const initialMenuItems: MenuItem[] = [
  { id: 1, name: '떡볶이', price: '11,000원', description: '2인 떡볶이' },
  {
    id: 2,
    name: '치즈 떡볶이',
    price: '12,000원',
    description: '2인 떡볶이+모짜렐라치즈+만두튀김',
  },
  {
    id: 3,
    name: '로제 떡볶이',
    price: '13,500원',
    description: '2인 로제떡볶이+베이컨+소세지',
  },
  {
    id: 4,
    name: '라볶이',
    price: '13,000원',
    description: '2인 떡볶이+라면사리+계란',
  },
  {
    id: 5,
    name: '짜장 떡볶이',
    price: '13,000원',
    description: '2인 짜장떡볶이+어묵',
  },
];

const AdminPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  const handleAddProduct = () => {
    alert('상품 등록 기능');
  };

  const handleEditProduct = (id: number) => {
    alert(`상품 수정 기능 (ID: ${id})`);
  };

  const handleDeleteProduct = (id: number) => {
    const filteredItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(filteredItems);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md overflow-hidden p-4">
      <AdminHeader onAddProduct={handleAddProduct} />
      <AdminMenuItemList
        menuItems={menuItems}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default AdminPage;
