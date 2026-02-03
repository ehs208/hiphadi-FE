import React from 'react';
import AdminMenuList from '@components/admin/AdminMenuList';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminMenuPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-lounge-bg">
      <div className="flex items-center p-4">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mr-4 text-lounge-text-secondary hover:text-lounge-gold transition-colors p-1"
        >
          <ArrowLeft size={24} />
        </button>
      </div>
      <AdminMenuList />
    </div>
  );
};

export default AdminMenuPage;
