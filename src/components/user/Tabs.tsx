import React, { useEffect, useState } from 'react';

interface TabsProps {
  categories: string[];
}

const Tabs: React.FC<TabsProps> = ({ categories }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let activityTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      const tabsElement = document.getElementById('tabs-container');
      if (tabsElement) {
        const tabsOffsetTop = tabsElement.offsetTop;
        setIsFixed(window.scrollY > tabsOffsetTop);
      }
    };

    const handleUserActivity = () => {
      setIsVisible(true);
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // 2초 동안 활동이 없으면 투명하게 만듦
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      clearTimeout(activityTimeout);
    };
  }, []);

  const handleScrollToCategory = (category: string) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="tabs-container" className="w-full">
      <div
        id="tabs"
        className={`flex ${isFixed ? 'fixed top-0 left-1/2 transform -translate-x-1/2 z-10 bg-[#1f1f1f]' : 'sticky top-0'} overflow-x-auto whitespace-nowrap items-center w-[370px] transition-all ${isFixed ? 'shadow-lg' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.5s' }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className="flex-1 text-sm font-PretendardBold text-white py-6"
            onClick={() => handleScrollToCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
