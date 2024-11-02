import { useQuery } from '@tanstack/react-query';
import { productListAPI } from '../../api/user/productAPI';

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

  return (
    <div className="flex flex-col gap-y-4">
      {productData?.map((product) => (
        <div
          key={product.id}
          className="flex items-center p-4 bg-white shadow-md rounded-md"
        >
          <div className="flex-1">
            <div className="font-semibold text-lg text-black">
              {product.name}
            </div>
            <div className="text-sm text-gray-500">{product.description}</div>
          </div>
          <div className="text-right font-semibold text-lg text-black">
            {product.price}원
          </div>
        </div>
      ))}
    </div>
  );
}
