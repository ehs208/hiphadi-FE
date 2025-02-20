import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAnalyticsReportAPI, formatDateString } from '@api/admin/adminAPI';
import { IoMdStar } from 'react-icons/io';
import {
  BarChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft, Calendar, RefreshCw, Info } from 'lucide-react';

interface PopularMenu {
  name: string;
  views: number;
}

interface PopularMenuData {
  menus: PopularMenu[];
  totalViews: number;
  totalMenuCount: number;
}

const PopularMenuPage: React.FC = () => {
  const navigate = useNavigate();

  // 현재 날짜와 7일 전 날짜 계산
  const today = new Date();
  const initialStartDate = new Date(today);
  initialStartDate.setDate(today.getDate() - 7);

  // 날짜 상태
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(today);

  // 메뉴 표시 개수
  const [limit, setLimit] = useState<number>(10);

  // 데이터 쿼리
  const { data, error, isLoading, refetch } = useQuery<PopularMenuData>({
    queryKey: ['popularMenus'],
    queryFn: async () => {
      const data = await getAnalyticsReportAPI(
        formatDateString(startDate),
        formatDateString(endDate),
        limit
      );
      return data; // API가 직접 필요한 형식으로 반환하므로 추가 변환 불필요
    },
    refetchOnMount: 'always',
    staleTime: 1000 * 60 * 15, // 15분 캐싱
  });

  // 조회하기 버튼 핸들러
  const handleSearch = () => {
    refetch();
  };

  // 색상 배열 - 인기도에 따라 그라데이션 효과
  const colors = [
    '#3B82F6', // 1위 - 진한 파랑
    '#60A5FA',
    '#93C5FD',
    '#BFDBFE',
    '#DBEAFE',
    '#EFF6FF',
    '#F3F4F6',
    '#F9FAFB',
    '#FAFAFA',
    '#FFFFFF',
  ];

  return (
    <div className="flex flex-col min-h-screen  text-white p-4 md:p-6">
      <header className="mb-8">
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-gray-300 hover:text-white mr-4 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-PretendardExtraBold">인기 메뉴 분석</h1>
        </div>
        <p className="text-gray-400 font-PretendardMedium">
          특정 기간 동안의 인기 메뉴를 확인하고 분석할 수 있습니다.
        </p>
      </header>

      {/* 필터 섹션 */}
      <section className="rounded-lg p-4 shadow-lg mb-6">
        <h2 className="text-xl font-PretendardBold mb-4 flex items-center">
          <Calendar className="mr-2" size={20} />
          조회 기간 설정
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2 font-PretendardMedium">
              시작 날짜
            </label>
            <input
              type="date"
              value={formatDateString(startDate)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white font-PretendardRegular"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2 font-PretendardMedium">
              종료 날짜
            </label>
            <input
              type="date"
              value={formatDateString(endDate)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white font-PretendardRegular"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-300 mb-2 font-PretendardMedium">
              표시할 메뉴 수
            </label>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white font-PretendardRegular"
            >
              <option value={5}>5개</option>
              <option value={10}>10개</option>
              <option value={15}>15개</option>
              <option value={20}>20개</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors font-PretendardMedium"
          >
            <RefreshCw size={16} className="mr-2" />
            조회하기
          </button>
        </div>
      </section>

      {/* 결과 표시 섹션 */}
      {isLoading ? (
        <div className="flex justify-center items-center h-60 text-white bg-slate-800 rounded-lg p-4">
          <div className="text-lg font-PretendardMedium">
            인기 메뉴 불러오는 중...
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-60 text-red-400 bg-slate-800 rounded-lg p-4">
          <div className="text-lg font-PretendardMedium">
            데이터를 불러오지 못했습니다. 나중에 다시 시도해주세요.
          </div>
        </div>
      ) : !data || !data.menus || data.menus.length === 0 ? (
        <div className="flex justify-center items-center h-60 text-gray-300 bg-slate-800 rounded-lg p-4">
          <div className="text-lg font-PretendardMedium">
            해당 기간에 조회된 메뉴 데이터가 없습니다.
          </div>
        </div>
      ) : (
        <>
          {/* 기간 표시 및 요약 */}
          <div className=" rounded-lg p-4 mb-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <h3 className="text-lg font-PretendardSemiBold text-gray-300 mb-2 md:mb-0">
                {formatDateString(startDate)} ~ {formatDateString(endDate)} 분석
                결과
              </h3>
              <div className="flex space-x-4 text-sm font-PretendardRegular">
                <div className="flex flex-col items-center px-4 py-2 bg-slate-700 rounded-md">
                  <span className="text-gray-400">총 조회수</span>
                  <span className="text-lg font-PretendardBold text-white">
                    {data.totalViews}회
                  </span>
                </div>
                <div className="flex flex-col items-center px-4 py-2 bg-slate-700 rounded-md">
                  <span className="text-gray-400">조회된 메뉴</span>
                  <span className="text-lg font-PretendardBold text-white">
                    {data.totalMenuCount}개
                  </span>
                </div>
              </div>
            </div>

            {/* 상위 메뉴 강조 표시 */}
            {data.menus.length > 0 && (
              <div className=" p-3 rounded-md flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mr-3">
                  <IoMdStar className="text-yellow-300" size={20} />
                </div>
                <div>
                  <div className="text-gray-300 text-sm font-PretendardMedium">
                    가장 인기있는 메뉴
                  </div>
                  <div className="text-xl font-PretendardBold flex items-center">
                    {data.menus[0].name}
                    <span className="ml-2 text-sm text-gray-400 font-PretendardRegular">
                      {data.menus[0].views}회 조회 (
                      {Math.round(
                        (data.menus[0].views / data.totalViews) * 100
                      )}
                      %)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 인기 메뉴 목록 */}
            <div className=" rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-PretendardBold mb-4 flex items-center">
                <IoMdStar className="text-yellow-400 mr-2" size={18} />
                순위별 메뉴
              </h3>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {data.menus.map((menu, index) => (
                  <div
                    key={menu.name}
                    className="flex items-center justify-between p-3 rounded-md bg-slate-700 transition-all hover:bg-slate-600"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div
                        className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full text-white font-PretendardBold mr-3"
                        style={{
                          backgroundColor:
                            colors[Math.min(index, colors.length - 1)],
                        }}
                      >
                        {index + 1}
                      </div>
                      <span className="font-PretendardSemiBold text-white truncate">
                        {menu.name}
                      </span>
                    </div>
                    <div className="font-PretendardMedium text-gray-300 ml-3 flex-shrink-0">
                      {menu.views}회
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 차트 시각화 */}
            <div className=" rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-PretendardBold mb-4">시각화 차트</h3>

              <div className="bg-slate-700 rounded-md p-4 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.menus}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                      stroke="#475569"
                    />
                    <XAxis
                      type="number"
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={120}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      tickFormatter={(value) =>
                        value.length > 15 ? `${value.slice(0, 12)}...` : value
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: 'none',
                        borderRadius: '0.375rem',
                        color: 'white',
                        fontFamily: 'Pretendard-Medium',
                      }}
                      formatter={(value) => [`${value}회`, '조회수']}
                    />
                    <Bar dataKey="views" name="조회수" radius={[0, 4, 4, 0]}>
                      {data.menus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={colors[Math.min(index, colors.length - 1)]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 인사이트 섹션 */}
          <div className=" rounded-lg p-4 shadow-lg mt-6">
            <h3 className="text-lg font-PretendardBold mb-4 flex items-center">
              <Info className="mr-2" size={18} />
              분석 인사이트
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 인기 카테고리 분석 (예시) */}
              <div className="bg-slate-700 rounded-md p-4">
                <h4 className="font-PretendardSemiBold mb-2 text-gray-200">
                  인기 카테고리
                </h4>
                <p className="text-sm text-gray-300 font-PretendardRegular mb-1">
                  최다 조회 메뉴는{' '}
                  <span className="font-PretendardMedium text-white">
                    {data.menus[0]?.name || '-'}
                  </span>
                  입니다.
                </p>
                <p className="text-sm text-gray-300 font-PretendardRegular">
                  총 조회수 중{' '}
                  <span className="font-PretendardMedium text-white">
                    {data.menus[0]
                      ? Math.round(
                          (data.menus[0].views / data.totalViews) * 100
                        )
                      : 0}
                    %
                  </span>
                  를 차지하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PopularMenuPage;
