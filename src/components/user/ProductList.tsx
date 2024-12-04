import { useQuery } from '@tanstack/react-query';
import { productListAPI } from '@api/user/productAPI';
import Tabs from './Tabs';
import React, { useState } from 'react';
import { IoMdStar } from 'react-icons/io';
import { ProductDetail } from './ProductDetail';

interface ProductListData {
  id: number;
  name: string;
  engName: string;
  description: string;
  price: number;
  category: string;
  status: string;
  isRecommend: string;
}

export default function ProductList() {
  const { data: productData } = useQuery<ProductListData[]>({
    queryKey: ['scheduledContest'],
    queryFn: productListAPI,
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
    <div className="flex flex-col w-screen gap-y-4 text-white p-4">
      <Tabs categories={categories} />
      {groupedData &&
        categories.map((category) => (
          <div key={category}>
            <div
              id={category}
              className="text-xl font-PretendardExtraBold mb-2"
            >
              {category}
            </div>
            {groupedData[category].map((product) => (
              <div
                key={product.id}
                className={`flex items-start p-4 shadow-md overflow-hidden rounded-md mb-2 transition-colors duration-500 ${
                  clickedProductId === product.id ? 'bg-slate-800' : ''
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div
                    className={`font-PretendardBold flex flex-col text-base sm:text-lg ${
                      product.status === 'SOLD_OUT' ? 'text-gray-500' : ''
                    }`}
                  >
                    <div className="flex items-center min-w-0">
                      <div className="flex items-center min-w-0 relative overflow-hidden">
                        <span className="truncate leading-tight">
                          {product.name}
                        </span>
                        {product.engName && (
                          <span className="ml-2 text-sm font-PretendardLight text-gray-300 truncate">
                            {product.engName}
                          </span>
                        )}
                        {product.isRecommend === 'RECOMMEND' && (
                          <IoMdStar
                            className="flex-shrink-0 ml-1 text-yellow-400 text-xs"
                            style={{ marginTop: '-2px' }}
                          />
                        )}
                      </div>
                    </div>
                    {product.status === 'SOLD_OUT' && (
                      <div className="text-sm font-PretendardSemiBold text-red-500 mt-0.5">
                        품절인 상품입니다
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-sm font-PretendardMedium truncate mt-1 ${
                      product.status === 'SOLD_OUT'
                        ? 'text-gray-500'
                        : 'text-gray-300'
                    }`}
                  >
                    {product.description}
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 text-right font-PretendardSemiBold text-base sm:text-lg whitespace-nowrap ml-2 ${
                    product.status === 'SOLD_OUT' ? 'text-gray-500' : ''
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
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white font-PretendardSemiBold px-4 py-2 rounded-md shadow-lg transition-opacity duration-500 whitespace-nowrap z-50">
          {message}
        </div>
      )}
      {isModalOpen && clickedProductId !== null && (
        <ProductDetail id={clickedProductId} onClose={closeModal} />
      )}
    </div>
  );
}
