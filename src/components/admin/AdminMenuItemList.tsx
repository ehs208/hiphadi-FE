import React from 'react';

interface MenuItem {
    id: number;
    name: string;
    price: string;
    description: string;
}

interface AdminMenuItemListProps {
    menuItems: MenuItem[];
    onEditProduct: (id: number) => void;
    onDeleteProduct: (id: number) => void;
}

const AdminMenuItemList: React.FC<AdminMenuItemListProps> = ({ menuItems, onEditProduct, onDeleteProduct }) => {
    return (
        <div className="space-y-4">
            {menuItems.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-2">
                    <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-gray-500 text-sm">{item.description}</div>
                        <div className="text-black font-semibold">{item.price}</div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEditProduct(item.id)}
                            className="text-blue-500 underline"
                        >
                            수정
                        </button>
                        <button
                            onClick={() => onDeleteProduct(item.id)}
                            className="text-red-500 underline"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminMenuItemList;