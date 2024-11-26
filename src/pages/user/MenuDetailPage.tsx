import { ProductDetail } from '@components/user/ProductDetail';

interface MenuDetailPageProps {
  id: number;
}

const MenuDetailPage: React.FC<MenuDetailPageProps> = ({ id }) => {
  return (
    <div>
      <ProductDetail id={id} />
    </div>
  );
};

export default MenuDetailPage;
