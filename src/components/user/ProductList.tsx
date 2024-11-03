import { useQuery } from '@tanstack/react-query';
import { productListAPI } from '@api/user/productAPI';
import Tabs from './Tabs';
import React, { useState } from 'react';

interface ProductListData {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
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

  const handleProductClick = (product: {
    id: number;
    name: string;
    price: number;
    status: string;
  }) => {
    if (product.status === 'SOLD_OUT') {
      setMessage('품절인 상품입니다');
      setTimeout(() => {
        setMessage('');
      }, 1000);
      return;
    }

    const storedProducts = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existingProduct = storedProducts.find(
      (p: any) => p.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedProducts.push({ ...product, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(storedProducts));

    setClickedProductId(product.id);
    setMessage('상품이 추가되었습니다');
    setTimeout(() => {
      setMessage('');
      setClickedProductId(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-screen gap-y-4 text-white p-4">
      <Tabs categories={categories} />
      {groupedData &&
        categories.map((category) => (
          <div key={category}>
            <div id={category} className="text-xl font-bold mb-2">
              {category}
            </div>
            {groupedData[category].map((product) => (
              <div
                key={product.id}
                className={`flex items-center p-4 shadow-md rounded-md mb-2 ${
                  clickedProductId === product.id ? 'bg-slate-600' : ''
                }`}
                onClick={() => handleProductClick(product)}
              >
                <div className="flex-1">
                  <div
                    className={`font-PretendardBlack text-lg ${
                      product.status === 'SOLD_OUT' ? 'text-gray-500' : ''
                    }`}
                  >
                    {product.name}
                    {product.status === 'SOLD_OUT' && (
                      <div className="text-sm font-PretendardSemiBold text-red-500">
                        품절인 상품입니다
                      </div>
                    )}
                  </div>
                  <div
                    className={`text-sm font-PretendardSemiBold ${
                      product.status === 'SOLD_OUT'
                        ? 'text-gray-500'
                        : 'text-gray-500'
                    }`}
                  >
                    {product.description}
                  </div>
                </div>
                <div
                  className={`text-right font-PretendardSemiBold text-lg ${
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
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 font-PretendardSemiBold bg-slate-600 text-white px-4 py-2 rounded-md shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}
