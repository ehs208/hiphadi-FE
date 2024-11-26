import { useQuery } from '@tanstack/react-query';
import { productDetailAPI } from '@api/user/productAPI';
import { CiStar } from 'react-icons/ci';

interface ProductDetailData {
  id: number;
  name: string;
  description: string;
  price: number;
  imgPath: string[];
  status: string;
  isRecommend: string;
}

export function ProductDetail({ id }: { id: number }) {
  const {
    data: productDetailData,
    error,
    isLoading,
  } = useQuery<ProductDetailData>({
    queryKey: ['productDetail', id],
    queryFn: () => productDetailAPI(id),
    refetchOnMount: 'always',
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
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
          <p className="text-gray-700 mb-4">{productDetailData?.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            {productDetailData?.price}원
          </p>

          <p
            className={`text-sm font-semibold ${productDetailData?.status === 'SOLD_OUT' ? 'text-red-500' : 'text-green-500'}`}
          >
            {productDetailData?.status === 'SOLD_OUT' ? '품절' : '판매 중'}
          </p>
        </div>
      </div>
    </div>
  );
}
