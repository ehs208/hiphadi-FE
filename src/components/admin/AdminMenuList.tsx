import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { menuListAdminAPI } from '@api/admin/adminAPI';
import { IoMdStar } from 'react-icons/io';
import AdminMenuDetail from './AdminMenuDetail';

interface ProductListData {
  id: number;
  name: string;
  engName: string;
  description: string;
  price: number | null;
  category: string;
  categoryEngName?: string;
  status: string;
  isRecommend: string;
}

interface AdminMenuListProps {
  situation: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const AdminMenuList: React.FC<AdminMenuListProps> = ({
  situation,
  onEdit,
  onDelete,
}) => {
  // 모달 관련 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const { data, error, isLoading } = useQuery<ProductListData[]>({
    queryKey: ['productAdminList', situation],
    queryFn: () => menuListAdminAPI(situation),
    refetchOnMount: 'always',
  });

  // 모달 열기 핸들러
  const handleEditClick = (id: number) => {
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItemId(null);
  };

  // 가격 업데이트 핸들러
  const handlePriceUpdate = async (id: number, newPrice: number) => {
    // onEdit가 있으면 실행
    if (onEdit) {
      onEdit(id);
    }
    handleCloseModal();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="text-lg font-PretendardMedium">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div className="text-lg font-PretendardMedium">
          Error: {error.message}
        </div>
      </div>
    );

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return '설명참조';
    return `${price.toLocaleString()}원`;
  };

  return (
    <div className="flex flex-col w-screen gap-y-4 text-white p-4">
      <h1 className="text-2xl font-PretendardExtraBold mb-6">
        {situation.toUpperCase()} 메뉴 관리
      </h1>
      <div className="space-y-4">
        {data?.map((item) => (
          <div
            key={item.id}
            className="flex items-start p-4 shadow-md overflow-hidden rounded-md bg-slate-800 transition-colors duration-500"
          >
            <div className="flex-1 min-w-0 mr-3">
              <div className="font-PretendardBold flex flex-col text-base sm:text-lg">
                <div className="flex items-center min-w-0 relative overflow-hidden">
                  <span className="truncate leading-tight">
                    {item.name || '이름 없음'}
                  </span>
                  {item.engName && (
                    <span className="ml-2 text-sm font-PretendardLight text-gray-300 truncate">
                      {item.engName}
                    </span>
                  )}
                  {item.isRecommend === 'RECOMMEND' && (
                    <IoMdStar
                      className="flex-shrink-0 ml-1 text-yellow-400 text-xs"
                      style={{ marginTop: '-2px' }}
                    />
                  )}
                </div>
                {item.status === 'SOLD_OUT' && (
                  <div className="text-sm font-PretendardSemiBold text-red-500 mt-0.5">
                    품절인 상품입니다
                  </div>
                )}
              </div>
              <div className="text-sm font-PretendardMedium truncate mt-1 text-gray-300">
                {item.description || '설명 없음'}
              </div>
              <div className="mt-2 space-y-1 text-sm font-PretendardMedium text-gray-300">
                <p className="">
                  <span className="font-PretendardSemiBold">카테고리:</span>{' '}
                  {item.category || '-'}
                  {item.categoryEngName && (
                    <span className="ml-2 font-PretendardLight">
                      {item.categoryEngName}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="font-PretendardSemiBold text-base sm:text-lg whitespace-nowrap">
                {formatPrice(item.price)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(item.id);
                  }}
                  className="p-2 text-blue-400 hover:bg-slate-700 rounded-full transition-colors"
                  aria-label="수정"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(item.id);
                  }}
                  className="p-2 text-red-400 hover:bg-slate-700 rounded-full transition-colors"
                  aria-label="삭제"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AdminMenuDetail 모달 */}
      {isModalOpen && selectedItemId && (
        <AdminMenuDetail
          id={selectedItemId}
          onClose={handleCloseModal}
          onUpdate={handlePriceUpdate}
        />
      )}
    </div>
  );
};

export default AdminMenuList;
