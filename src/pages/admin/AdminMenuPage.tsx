import React from 'react';
import { useParams } from 'react-router-dom';
import AdminMenuList from '@components/admin/AdminMenuList';

const AdminMenuPage: React.FC = () => {
  const { situation } = useParams<{ situation: string }>();
  return (
    <div>
      <AdminMenuList situation={situation || ''} />
    </div>
  );
};

export default AdminMenuPage;
