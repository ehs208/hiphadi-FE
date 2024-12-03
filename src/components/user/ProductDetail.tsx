import { useQuery } from '@tanstack/react-query';
import { productDetailAPI } from '@api/user/productAPI';
import { CiStar } from 'react-icons/ci';
import React, { useState } from 'react';

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
  onClose: () => void;
}

export function ProductDetail({ id, onClose }: ProductDetailProps) {
  const {
    data: productDetailData,
    error,
    isLoading,
  } = useQuery<ProductDetailData>({
    queryKey: ['productDetail', id],
    queryFn: () => productDetailAPI(id),
    refetchOnMount: 'always',
  });

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAddToCart = () => {
    const storedProducts = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existingProductIndex = storedProducts.findIndex(
      (p: any) => p.id === productDetailData?.id
    );

    if (existingProductIndex !== -1) {
      storedProducts[existingProductIndex].quantity += quantity;
    } else {
      storedProducts.push({
        ...productDetailData,
        quantity: quantity,
      });
    }

    sessionStorage.setItem('cart', JSON.stringify(storedProducts));
    setMessage(`장바구니에 ${quantity}개 추가되었습니다`);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl z-10 w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="p-4 space-y-4">
          {/* 상품 이미지 섹션 */}
          <div className="w-full relative">
            <img
              src={productDetailData?.imgPath[0]}
              alt={productDetailData?.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* 상품 정보 섹션 */}
          <div className="w-full space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-xl sm:text-2xl text-gray-900 font-PretendardBold">
                {productDetailData?.name}
              </h1>
              {productDetailData?.isRecommend === 'Recommend' && (
                <div className="text-yellow-500 ml-2">
                  <CiStar className="text-xl" />
                </div>
              )}
            </div>

            <p className="text-gray-700 text-sm sm:text-base font-PretendardLight">
              {productDetailData?.description}
            </p>

            <p className="text-xl sm:text-2xl font-PretendardSemiBold text-gray-900">
              {productDetailData?.price.toLocaleString()}원
            </p>

            <p
              className={`text-sm font-PretendardSemibold ${
                productDetailData?.status === 'SOLD_OUT'
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}
            >
              {productDetailData?.status === 'SOLD_OUT' ? '품절' : '판매 중'}
            </p>

            {/* 수량 선택 및 장바구니 버튼 */}
            {productDetailData?.status !== 'SOLD_OUT' && (
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center h-10 border border-gray-300 rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md transition-colors"
                  >
                    -
                  </button>
                  <div className="w-12 h-full flex items-center justify-center border-x border-gray-300 bg-white text-gray-800">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-md  transition-colors"
                >
                  장바구니에 추가
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 알림 메시지 */}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white font-PretendardSemiBold px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 whitespace-nowrap z-50">
          {message}
        </div>
      )}
    </div>
  );
}
