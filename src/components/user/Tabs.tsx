const Tabs: React.FC = () => {
  return (
    <div
      className="overflow-x-auto whitespace-nowrap p-4 border-b border-gray-200 bg-gray-100"
      style={{ width: 'calc(4 * 100px)' }}
    >
      <button className="inline-block text-sm font-semibold text-black border-b-2 border-black w-24">
        대표메뉴
      </button>
      <button className="inline-block text-sm text-gray-500 w-24">
        인기 반반메뉴
      </button>
      <button className="inline-block text-sm text-gray-500 w-24">
        가성비 세트메뉴
      </button>
      <button className="inline-block text-sm text-gray-500 w-24">
        사이드메뉴
      </button>
    </div>
  );
};

export default Tabs;
