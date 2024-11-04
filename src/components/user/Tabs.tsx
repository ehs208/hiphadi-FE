import React, { useEffect, useState, useRef } from 'react';

interface TabsProps {
  categories: string[];
}

const Tabs: React.FC<TabsProps> = ({ categories }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const activityTimeout = useRef<NodeJS.Timeout | null>(null);

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
      if (activityTimeout.current) {
        clearTimeout(activityTimeout.current);
      }
      activityTimeout.current = setTimeout(() => {
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
      if (activityTimeout.current) {
        clearTimeout(activityTimeout.current);
      }
    };
  }, []);

  const handleScrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setTimeout(() => {
      setActiveCategory(null);
    }, 500); // 0.5초 후에 원래 색으로 돌아옴
  };

  return (
    <div id="tabs-container" className="w-full overflow-x-hidden">
      <div
        id="tabs"
        className={`${isFixed ? 'fixed top-0 left-0 right-0 z-10 bg-[#1f1f1f]' : ''}  w-full overflow-x-scroll whitespace-nowrap items-center transition-all ${isFixed ? 'shadow-lg' : ''} ${isVisible || !isFixed ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.5s' }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`flex-auto text-sm font-PretendardBold text-white p-4 transition-colors duration-500 ${activeCategory === category ? 'bg-slate-800' : ''}`}
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
