import picture1 from '../../public/images/hiphadi1.jpeg';

const Header: React.FC = () => {
  return (
    <header className="">
      <div className="h-1/6">
        <img src={picture1} alt={'힙하디 사진1'} />
      </div>
      <div className="text-lg font-bold">힙하디</div>
    </header>
  );
};

export default Header;
