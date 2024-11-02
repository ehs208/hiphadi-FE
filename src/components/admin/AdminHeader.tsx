import React from 'react';

interface AdminHeaderProps {
    onAddProduct: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onAddProduct }) => {
    return (
        <header className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold">상품 관리</h1>
            <button
                onClick={onAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                상품 등록
            </button>
        </header>
    );
};

export default AdminHeader;