import { useQuery } from '@tanstack/react-query';
import { productListAPI } from '@api/user/productAPI';
import Tabs from './Tabs';

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

  return (
    <div className="flex flex-col w-screen gap-y-4 text-white p-4">
      <Tabs categories={categories} />
      {groupedData &&
        categories.map((category) => (
          <div key={category} id={category}>
            <div className="text-xl font-bold mb-2">{category}</div>
            {groupedData[category].map((product) => (
              <div
                key={product.id}
                className="flex items-center p-4 shadow-md rounded-md mb-2"
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
    </div>
  );
}
