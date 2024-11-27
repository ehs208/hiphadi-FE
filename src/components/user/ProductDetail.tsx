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
  onClose: () => void; // 모달을 닫는 함수
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

  const [message, setMessage] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleAddToCart = () => {
    const storedProducts = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existingProduct = storedProducts.find(
      (p: any) => p.id === productDetailData?.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedProducts.push({ ...productDetailData, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(storedProducts));
    setMessage('장바구니에 추가되었습니다');
    setTimeout(() => {
      setMessage('');
    }, 2000); // 2초 후에 메시지 숨기기
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-5/6 max-w-lg p-6 rounded-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <img
                src={productDetailData?.imgPath[0]}
                alt={productDetailData?.name}
                className="w-full h-auto text-gray-700 rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <h1 className="text-3xl text-gray-900 font-bold mb-2">
                {productDetailData?.name}
              </h1>
              {productDetailData?.isRecommend === 'Recommend' && (
                <div className="text-yellow-500">
                  <CiStar className="inline-block" />
                </div>
              )}
              <p className="text-gray-700 mb-4">
                {productDetailData?.description}
              </p>
              <p className="text-2xl font-semibold text-gray-900 mb-4">
                {productDetailData?.price}원
              </p>
              <p className="text-gray-600 mb-2">
                카테고리: {productDetailData?.category}
              </p>
              <p
                className={`text-sm font-semibold ${productDetailData?.status === 'SOLD_OUT' ? 'text-red-500' : 'text-green-500'}`}
              >
                {productDetailData?.status === 'SOLD_OUT' ? '품절' : '판매 중'}
              </p>
              {productDetailData?.status !== 'SOLD_OUT' && (
                <button
                  onClick={handleAddToCart}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-lg transition duration-300"
                >
                  장바구니에 추가
                </button>
              )}
            </div>
          </div>
          {message && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white font-PretendardSemiBold px-4 py-2 rounded-md shadow-lg transition-opacity duration-500">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
