import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { menuDetailAPI } from '@api/user/productAPI';

interface ProductDetailData {
  id: number;
  name: string;
  description: string;
  price: number;
  imgPath: string[];
  category: string;
  status: string;
  isRecommend: string;
}

interface ProductDetailProps {
  id: number;
  onClose?: () => void;
  onUpdate?: (id: number, newPrice: number) => void;
}

const AdminMenuDetail: React.FC<ProductDetailProps> = ({
  id,
  onClose,
  onUpdate,
}) => {
  const {
    data: productDetailData,
    error,
    isLoading,
  } = useQuery<ProductDetailData>({
    queryKey: ['menuDetailAPI', id],
    queryFn: () => menuDetailAPI(id),
    refetchOnMount: 'always',
  });

  const [price, setPrice] = useState<number | ''>(
    productDetailData?.price || ''
  );
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full p-4 text-white bg-slate-900">
        <div className="text-lg font-PretendardMedium">Loading...</div>
      </div>
    );
  }

  if (error || !productDetailData) {
    return (
      <div className="min-h-screen w-full p-4 text-white bg-slate-900">
        <div className="text-red-500 font-PretendardMedium">
          Error loading menu detail
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof price === 'number' && onUpdate) {
      onUpdate(id, price);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-PretendardExtraBold">메뉴 상세</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded border border-gray-600 hover:border-gray-400"
            >
              목록으로
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-PretendardMedium text-gray-300">
              메뉴명
            </label>
            <input
              type="text"
              value={productDetailData.name}
              disabled
              className="w-full bg-slate-800 rounded p-3 text-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-PretendardMedium text-gray-300">
              설명
            </label>
            <textarea
              value={productDetailData.description}
              disabled
              rows={4}
              className="w-full bg-slate-800 rounded p-3 text-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-PretendardMedium text-gray-300">
              가격
            </label>
            <div className="flex gap-3">
              {isEditing ? (
                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value === '' ? '' : Number(e.target.value)
                    )
                  }
                  className="flex-1 bg-slate-800 rounded p-3 text-white"
                  min="0"
                />
              ) : (
                <input
                  type="text"
                  value={`${productDetailData.price.toLocaleString()}원`}
                  disabled
                  className="flex-1 bg-slate-800 rounded p-3 text-gray-300"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  if (isEditing) {
                    setPrice(productDetailData.price);
                  } else {
                    setPrice(productDetailData.price);
                  }
                  setIsEditing(!isEditing);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-PretendardMedium min-w-[100px]"
              >
                {isEditing ? '취소' : '수정'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-PretendardMedium text-gray-300">
              카테고리
            </label>
            <input
              type="text"
              value={productDetailData.category}
              disabled
              className="w-full bg-slate-800 rounded p-3 text-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-PretendardMedium text-gray-300">
              상태
            </label>
            <input
              type="text"
              value={productDetailData.status}
              disabled
              className="w-full bg-slate-800 rounded p-3 text-gray-300"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-PretendardMedium min-w-[100px]"
              >
                저장
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminMenuDetail;
