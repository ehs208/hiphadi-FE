import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, UtensilsCrossed, MessageSquare, ImageIcon, ExternalLink, Type } from 'lucide-react';

const AdminDashBoard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full min-h-screen text-lounge-text p-4 md:p-6">
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-PretendardExtraBold mb-2 text-lounge-gold-light">
              힙하디 관리자 대시보드
            </h1>
            <p className="text-lounge-text-secondary font-PretendardMedium">
              메뉴 관리와 통계를 한 곳에서 확인하세요
            </p>
          </div>
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-2 px-4 py-2.5 bg-lounge-surface border border-lounge-border rounded-lg text-lounge-text-secondary hover:text-lounge-gold hover:border-lounge-gold/50 transition-all duration-200 font-PretendardMedium text-sm whitespace-nowrap"
          >
            <ExternalLink size={16} />
            메뉴판 보기
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        <section
          className="rounded-xl p-6 shadow-lounge bg-lounge-card cursor-pointer hover:bg-lounge-card-hover border border-lounge-border transition-all duration-300 hover:border-lounge-gold/30 hover:shadow-gold-glow"
          onClick={() => navigate('/admin/menu')}
        >
          <h2 className="text-xl font-PretendardBold mb-2 flex items-center text-lounge-text">
            <UtensilsCrossed className="mr-2 text-lounge-gold" size={20} />
            메뉴 관리
          </h2>
          <p className="text-lounge-text-secondary font-PretendardRegular">
            메뉴 추가, 수정, 삭제 및 품절/추천 관리를 할 수 있습니다.
          </p>
        </section>

        <section
          className="rounded-xl p-6 shadow-lounge bg-lounge-card cursor-pointer hover:bg-lounge-card-hover border border-lounge-border transition-all duration-300 hover:border-lounge-gold/30 hover:shadow-gold-glow"
          onClick={() => navigate('/admin/statistics')}
        >
          <h2 className="text-xl font-PretendardBold mb-2 flex items-center text-lounge-text">
            <TrendingUp className="mr-2 text-lounge-gold" size={20} />
            통계
          </h2>
          <p className="text-lounge-text-secondary font-PretendardRegular">
            인기 메뉴와 방문 통계를 확인할 수 있습니다.
          </p>
        </section>

        <section
          className="rounded-xl p-6 shadow-lounge bg-lounge-card cursor-pointer hover:bg-lounge-card-hover border border-lounge-border transition-all duration-300 hover:border-lounge-gold/30 hover:shadow-gold-glow"
          onClick={() => navigate('/admin/images')}
        >
          <h2 className="text-xl font-PretendardBold mb-2 flex items-center text-lounge-text">
            <ImageIcon className="mr-2 text-lounge-gold" size={20} />
            이미지 관리
          </h2>
          <p className="text-lounge-text-secondary font-PretendardRegular">
            메인 페이지 헤더와 메뉴 이미지를 관리할 수 있습니다.
          </p>
        </section>

        <section
          className="rounded-xl p-6 shadow-lounge bg-lounge-card cursor-pointer hover:bg-lounge-card-hover border border-lounge-border transition-all duration-300 hover:border-lounge-gold/30 hover:shadow-gold-glow"
          onClick={() => navigate('/admin/suggestions')}
        >
          <h2 className="text-xl font-PretendardBold mb-2 flex items-center text-lounge-text">
            <MessageSquare className="mr-2 text-lounge-gold" size={20} />
            건의 관리
          </h2>
          <p className="text-lounge-text-secondary font-PretendardRegular">
            고객의 익명 건의사항을 확인하고 관리할 수 있습니다.
          </p>
        </section>

        <section
          className="rounded-xl p-6 shadow-lounge bg-lounge-card cursor-pointer hover:bg-lounge-card-hover border border-lounge-border transition-all duration-300 hover:border-lounge-gold/30 hover:shadow-gold-glow"
          onClick={() => navigate('/admin/site-settings')}
        >
          <h2 className="text-xl font-PretendardBold mb-2 flex items-center text-lounge-text">
            <Type className="mr-2 text-lounge-gold" size={20} />
            업장 정보
          </h2>
          <p className="text-lounge-text-secondary font-PretendardRegular">
            메인 페이지의 안내 문구와 업장 정보를 수정할 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AdminDashBoard;
