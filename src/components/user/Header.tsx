import React from 'react';
import { useQuery } from '@tanstack/react-query';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaInstagram } from 'react-icons/fa6';
import ImageHeader from './ImageHeader';
import { getSiteSettingsAPI, SiteSetting } from '@api/admin/siteSettingAPI';

const Header: React.FC = () => {
  const { data: siteSettings } = useQuery<SiteSetting[]>({
    queryKey: ['siteSettings'],
    queryFn: getSiteSettingsAPI,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const getSetting = (key: string, fallback: string): string => {
    const setting = siteSettings?.find((s) => s.settingKey === key);
    return setting?.settingValue || fallback;
  };

  return (
    <div className="text-lounge-text w-screen">
      <ImageHeader />
      <div className="w-screen p-4 pb-2">
        <div className="flex items-center mb-3">
          <div className="text-xl mr-3 font-PretendardExtraBold tracking-wide text-lounge-gold-light">
            힙하디
          </div>
          <div className="text-lounge-gold hover:text-lounge-gold-light transition-colors duration-300">
            <a
              href="https://www.instagram.com/hiphadi_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-lg" />
            </a>
          </div>
        </div>
        <div className="text-base sm:text-lg font-PretendardSemiBold text-lounge-gold leading-relaxed">
          <div>{getSetting('intro_ko', '선택한 상품은 카운터에서 보여주세요 결제는 카운터에서!')}</div>
          <div className="text-sm sm:text-base text-lounge-text-secondary mt-1">
            {getSetting('intro_en', 'Please show your selected items at the counter. Payment is also at the counter!')}
          </div>
        </div>
        <div className="text-sm font-PretendardThin text-lounge-text-secondary mt-3 border-t border-lounge-border pt-3">
          {getSetting('bathroom_password', '화장실 비밀번호: 5456*')}
        </div>
      </div>
    </div>
  );
};

export default Header;
