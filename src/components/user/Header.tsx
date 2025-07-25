import React from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaInstagram } from 'react-icons/fa6';
import ImageHeader from './ImageHeader';

const Header: React.FC = () => {
  return (
    <div className="text-white w-screen">
      <ImageHeader />
      <div className="w-screen p-4">
        <div className="flex items-center">
          <div className="text-lg mr-2 font-PretendardExtraBold">힙하디</div>
          <div>
            <a
              href="https://www.instagram.com/hiphadi_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="text-xl font-PretendardSemiBold text-red-300">
          <div>선택한 상품은 카운터에서 보여주세요 결제는 카운터에서!</div>
          <div>Please show your selected items at the counter. Payment is also at the counter!</div>
        </div>
        <div className="text-sm font-PretendardThin">
          화장실 비밀번호: 5456*
        </div>
      </div>
    </div>
  );
};

export default Header;
