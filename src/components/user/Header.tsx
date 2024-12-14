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
        <div className="text-sm font-PretendardSemiBold text-red-300">
          <div>주문은 카운터에서만 가능합니다.</div>
          <div>장바구니에 상품을 담은 후, 카운터에 오셔서 주문해주세요.</div>
        </div>
        <div className="text-sm font-PretendardThin">
          화장실 비밀번호: 28244*
        </div>
      </div>
    </div>
  );
};

export default Header;
