import { useQuery } from '@tanstack/react-query';
import { menuListAPI } from '@api/user/productAPI';
import Tabs from './Tabs';
import React, { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { MenuDetail } from './MenuDetail';

interface ProductListData {
  id: number;
  name: string;
  engName: string;
  description: string;
  price: number;
  category: string;
  categoryEngName?: string;
  status: string;
  isRecommend: string;
}

export default function MenuList() {
  const { data: productData } = useQuery<ProductListData[]>({
    queryKey: ['productList'],
    queryFn: menuListAPI,
    refetchOnMount: 'always',
  });

  const groupedData = productData?.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {} as Record<string, ProductListData[]>
  );

  const categories = groupedData ? Object.keys(groupedData) : [];

  const [message, setMessage] = useState('');
  const [clickedProductId, setClickedProductId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: ProductListData) => {
    if (product.status === 'SOLD_OUT') {
      setMessage('품절된 상품입니다');
      setTimeout(() => {
        setMessage('');
      }, 1000);
      return;
    }

    if (!product.price) {
      setMessage('카운터에 오셔서 주문해 주세요');
      setTimeout(() => {
        setMessage('');
      }, 1000);
      return;
    }

    setClickedProductId(product.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedProductId(null);
  };

  return (
    <div className="flex flex-col w-screen gap-y-4 text-lounge-text p-4">
      <Tabs categories={categories} />
      {groupedData &&
        categories.map((category) => (
          <div key={category}>
            <div
              id={category}
              className="text-xl font-PretendardExtraBold mb-3 flex items-center border-b border-lounge-border pb-2"
            >
              <span className="text-lounge-text">{category}</span>
              {groupedData[category][0]?.categoryEngName && (
                <span className="ml-2 text-sm font-PretendardLight text-lounge-text-secondary">
                  {groupedData[category][0].categoryEngName}
                </span>
              )}
            </div>
            {groupedData[category].map((product) => (
              <div
                key={product.id}
                className={`flex items-start p-4 overflow-hidden rounded-lg mb-2 transition-all duration-300 min-h-[60px] ${
                  product.status === 'SOLD_OUT'
                    ? 'bg-lounge-card/40 opacity-50'
                    : clickedProductId === product.id
                      ? 'bg-lounge-card-hover shadow-gold-glow'
                      : 'bg-lounge-card/60 hover:bg-lounge-card active:bg-lounge-card-hover'
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div
                    className={`font-PretendardBold flex flex-col text-base sm:text-lg ${
                      product.status === 'SOLD_OUT' ? 'text-lounge-text-muted' : 'text-lounge-text'
                    }`}
                  >
                    <div className="flex items-center min-w-0">
                      <div className="flex items-center min-w-0 relative overflow-hidden">
                        <span className={`truncate leading-tight ${product.status === 'SOLD_OUT' ? 'line-through decoration-lounge-text-muted/50' : ''}`}>
                          {product.name}
                        </span>
                        {product.engName && (
                          <span className={`ml-2 text-sm font-PretendardLight truncate ${product.status === 'SOLD_OUT' ? 'text-lounge-text-muted' : 'text-lounge-text-secondary'}`}>
                            {product.engName}
                          </span>
                        )}
                        {product.isRecommend === 'RECOMMEND' && (
                          <IoMdStar
                            className="flex-shrink-0 ml-1 text-lounge-gold text-sm drop-shadow-[0_0_4px_rgba(200,149,108,0.6)]"
                            style={{ marginTop: '-2px' }}
                          />
                        )}
                      </div>
                    </div>
                    {product.status === 'SOLD_OUT' && (
                      <div className="text-sm font-PretendardSemiBold text-lounge-danger mt-0.5">
                        품절인 상품입니다
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-sm font-PretendardMedium truncate mt-1 ${
                      product.status === 'SOLD_OUT'
                        ? 'text-lounge-text-muted'
                        : 'text-lounge-text-secondary'
                    }`}
                  >
                    {product.description}
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 text-right font-PretendardSemiBold text-base sm:text-lg whitespace-nowrap ml-2 ${
                    product.status === 'SOLD_OUT' ? 'text-lounge-text-muted' : 'text-lounge-gold-light'
                  }`}
                >
                  {product.price
                    ? `${product.price.toLocaleString()}원`
                    : '설명참조'}
                </div>
              </div>
            ))}
          </div>
        ))}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-lounge-card text-lounge-text font-PretendardSemiBold px-5 py-3 rounded-lg shadow-lounge-lg border border-lounge-border transition-opacity duration-500 whitespace-nowrap z-50">
          {message}
        </div>
      )}
      {isModalOpen && clickedProductId !== null && (
        <MenuDetail id={clickedProductId} onClose={closeModal} />
      )}
    </div>
  );
}
