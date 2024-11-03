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

    const tabsElement = document.getElementById('tabs');
    if (tabsElement) {
      tabsElement.scrollLeft = 0;
    }

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
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div id="tabs-container" className="w-screen overflow-x-auto">
      <div
        id="tabs"
        className={`${isFixed ? 'fixed top-0 left-0 right-0 z-10 bg-[#1f1f1f]' : ''}  w-full overflow-x-scroll whitespace-nowrap items-center transition-all ${isFixed ? 'shadow-lg' : ''} ${isVisible || !isFixed ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.5s' }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className="flex-auto text-sm font-PretendardBold text-white py-6 px-4"
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
