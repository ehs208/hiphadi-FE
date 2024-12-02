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

    setClickedProductId(product.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setClickedProductId(null);
  };

  return (
    <div className="flex flex-col w-screen gap-y-4  text-white p-4">
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
                className={`flex items-center p-4 shadow-md overflow-hidden rounded-md mb-2 transition-colors duration-500 ${
                  clickedProductId === product.id ? 'bg-slate-800' : ''
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className="flex-1 min-w-0 mr-4">
                  <div
                    className={`font-PretendardBold text-lg ${
                      product.status === 'SOLD_OUT' ? 'text-gray-500' : ''
                    }`}
                  >
                    <div className="flex items-center ">
                      {product.name}
                      {product.isRecommend === 'Recommend' && (
                        <IoMdStar className="text-white absolute top-0 right-0 ml-2" />
                      )}
                      <div className="text-sm ml-1 font-PretendardLight text-gray-300">
                        {product.engName}
                      </div>
                    </div>
                    {product.status === 'SOLD_OUT' && (
                      <div className="text-sm font-PretendardSemiBold text-red-500">
                        품절인 상품입니다
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-sm font-PretendardMedium truncate max-w-[calc(100%-2rem)] ${
                      product.status === 'SOLD_OUT'
                        ? 'text-gray-500'
                        : 'text-gray-300'
                    }`}
                  >
                    {product.description}
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 text-right font-PretendardSemiBold text-lg ${
                    product.status === 'SOLD_OUT' ? 'text-gray-500' : ''
                  }`}
                >
                  {product.price}원
                </div>
              </div>
            ))}
          </div>
        ))}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 font-PretendardSemiBold bg-slate-600 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-500">
          {message}
        </div>
      )}
      {isModalOpen && clickedProductId !== null && (
        <ProductDetail id={clickedProductId} onClose={closeModal} />
      )}
    </div>
  );
}
