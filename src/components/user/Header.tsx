import React from 'react';
import Slider from 'react-slick';
import picture1 from '@images/hiphadi1.jpeg';
import picture2 from '@images/hiphadi2.jpeg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaInstagram } from 'react-icons/fa6';

const Header: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <header className="w-full text-white">
      <div className="w-full max-w-[370px] h-[300px] m-0">
        <Slider {...settings}>
          <div>
            <img src={picture1} alt={'힙하디 사진1'} />
          </div>
          <div>
            <img src={picture2} alt={'힙하디 사진2'} />
          </div>
        </Slider>
      </div>
      <div className="text-lg font-PretendardExtraBold">힙하디</div>
      <div>
        <a
          href="https://www.instagram.com/hiphadi_/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </header>
  );
};

export default Header;
