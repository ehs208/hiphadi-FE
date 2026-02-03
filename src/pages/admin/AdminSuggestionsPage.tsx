import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AdminSuggestionList from '@components/admin/AdminSuggestionList';

const AdminSuggestionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen bg-lounge-bg text-lounge-text p-4 md:p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mr-4 text-lounge-text-secondary hover:text-lounge-gold transition-colors p-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-PretendardExtraBold text-left">건의 관리</h1>
      </div>

      <div className="w-full">
        <AdminSuggestionList />
      </div>
    </div>
  );
};

export default AdminSuggestionsPage;
