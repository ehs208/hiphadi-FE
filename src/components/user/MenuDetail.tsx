import { useQuery } from '@tanstack/react-query';
import { menuDetailAPI } from '@api/user/productAPI';
import { CiStar } from 'react-icons/ci';
import { ImageOff } from 'lucide-react';
import React, { useState } from 'react';
import { getImageUrl } from '@lib/axiosConfig';

interface ProductDetailData {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: string;
  status: string;
  isRecommend: string;
}

interface ProductDetailProps {
  id: number;
  onClose: () => void;
}

export function MenuDetail({ id, onClose }: ProductDetailProps) {
  const {
    data: productDetailData,
    error,
    isLoading,
  } = useQuery<ProductDetailData>({
    queryKey: ['menuDetailAPI', id],
    queryFn: () => menuDetailAPI(id),
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
      onClose();
    }, 300);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-lounge-card w-full max-w-lg rounded-xl shadow-lounge-lg relative border border-lounge-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute -top-10 right-0 text-lounge-text-secondary hover:text-lounge-text text-3xl w-10 h-10 flex items-center justify-center transition-colors duration-200"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          <div className="space-y-4">
            {/* 상품 이미지 섹션 */}
            {!productDetailData?.imageUrl ? (
              <div className="w-full h-64 flex items-center justify-center bg-lounge-surface rounded-t-xl">
                <div className="text-center">
                  <ImageOff className="w-12 h-12 mx-auto mb-2 text-lounge-text-muted" />
                  <p className="text-lounge-text-secondary font-PretendardLight">이미지 준비중</p>
                </div>
              </div>
            ) : (
              <div className="w-full relative">
                <img
                  src={getImageUrl(productDetailData.imageUrl)}
                  alt={productDetailData.name}
                  className="w-full h-auto rounded-t-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-lounge-card to-transparent" />
              </div>
            )}

            {/* 상품 정보 섹션 */}
            <div className="w-full space-y-4 p-5">
              <div className="flex items-start justify-between">
                <h1 className="text-xl sm:text-2xl text-lounge-text font-PretendardBold">
                  {productDetailData?.name}
                </h1>
                {productDetailData?.isRecommend === 'Recommend' && (
                  <div className="text-lounge-gold ml-2">
                    <CiStar className="text-xl drop-shadow-[0_0_4px_rgba(200,149,108,0.6)]" />
                  </div>
                )}
              </div>

              <p className="text-lounge-text-secondary text-sm sm:text-base font-PretendardLight leading-relaxed">
                {productDetailData?.description}
              </p>

              <p className="text-xl sm:text-2xl font-PretendardSemiBold text-lounge-gold-light">
                {productDetailData?.price
                  ? `${productDetailData?.price.toLocaleString()}원`
                  : '설명참조'}
              </p>

              <p
                className={`text-sm font-PretendardSemibold ${
                  productDetailData?.status === 'SOLD_OUT'
                    ? 'text-lounge-danger'
                    : 'text-lounge-success'
                }`}
              >
                {productDetailData?.status === 'SOLD_OUT' ? '품절' : '판매 중'}
              </p>

              {/* 수량 선택 및 장바구니 버튼 */}
              {productDetailData?.status !== 'SOLD_OUT' && (
                <div className="flex items-center gap-4 pt-2">
                  <div className="inline-flex items-center h-12 border border-lounge-border rounded-lg overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="w-12 h-full flex items-center justify-center text-lounge-text-secondary hover:bg-lounge-card-hover hover:text-lounge-text transition-colors text-lg"
                    >
                      -
                    </button>
                    <div className="w-14 h-full flex items-center justify-center border-x border-lounge-border bg-lounge-surface text-lounge-text font-PretendardMedium">
                      {quantity}
                    </div>
                    <button
                      onClick={increaseQuantity}
                      className="w-12 h-full flex items-center justify-center text-lounge-text-secondary hover:bg-lounge-card-hover hover:text-lounge-text transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-lounge-gold hover:bg-lounge-gold-dark text-lounge-bg px-6 rounded-lg font-PretendardBold transition-all duration-300 shadow-gold-glow active:scale-[0.98]"
                  >
                    장바구니에 추가
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 알림 메시지 */}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-lounge-card text-lounge-text font-PretendardSemiBold px-5 py-3 rounded-lg shadow-lounge-lg border border-lounge-gold/30 transition-opacity duration-500 whitespace-nowrap z-50">
          {message}
        </div>
      )}
    </div>
  );
}
