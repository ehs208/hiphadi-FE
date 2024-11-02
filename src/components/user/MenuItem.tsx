interface MenuItemProps {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, price, description }) => {
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <div className="font-semibold text-black">{name}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <div className="text-right font-semibold text-black">{price}</div>
    </div>
  );
};

export default MenuItem;
