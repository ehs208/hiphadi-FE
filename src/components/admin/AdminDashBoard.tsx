import React from 'react';
import { useNavigate } from 'react-router-dom';
import Situation from '@components/admin/Situation';
import { Settings, TrendingUp } from 'lucide-react';
import { IoMdStar } from 'react-icons/io';

const AdminDashBoard: React.FC = () => {
  const navigate = useNavigate();

  // 인기 메뉴 페이지로 이동하는 함수
  const handlePopularMenusClick = () => {
    navigate('/admin/popular-menus');
  };

  return (
    <div className="flex flex-col min-h-screen text-white p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-PretendardExtraBold mb-2">
          힙하디 관리자 대시보드
        </h1>
        <p className="text-gray-400 font-PretendardMedium">
          메뉴 관리와 통계를 한 곳에서 확인하세요
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* 상황 설정 섹션 */}
        <section className=" rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-PretendardBold mb-4 flex items-center">
            <Settings className="mr-2" size={20} />
            메뉴 상태 관리
          </h2>
          <Situation />
        </section>

        {/* 인기 메뉴 바로가기 카드 */}
        <section className=" rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-PretendardBold mb-4 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            메뉴 인기도 분석
          </h2>

          <div className="mb-6">
            <p className="text-gray-300 font-PretendardRegular mb-4">
              Google Analytics 데이터를 기반으로 메뉴별 인기도를 분석하고
              트렌드를 파악할 수 있습니다. 어떤 메뉴가 가장 인기있는지
              확인해보세요.
            </p>

            <button
              onClick={handlePopularMenusClick}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors font-PretendardMedium flex items-center justify-center"
            >
              <IoMdStar className="mr-2 text-yellow-300" size={18} />
              인기 메뉴 분석 보기
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashBoard;
