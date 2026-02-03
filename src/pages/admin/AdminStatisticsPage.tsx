import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getPopularMenusAPI,
  formatDateString,
} from '@api/admin/adminAPI';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminStatisticsPage: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [startDate, setStartDate] = useState(formatDateString(thirtyDaysAgo));
  const [endDate, setEndDate] = useState(formatDateString(today));
  const [limit, setLimit] = useState(10);

  const { data: popularMenus } = useQuery({
    queryKey: ['popularMenus', startDate, endDate, limit],
    queryFn: () => getPopularMenusAPI(startDate, endDate, limit),
    enabled: !!startDate && !!endDate,
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-lounge-bg text-lounge-text p-4 md:p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mr-4 text-lounge-text-secondary hover:text-lounge-gold transition-colors p-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-PretendardExtraBold">통계</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
            시작일
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-lounge-surface border border-lounge-border rounded-lg p-3 text-sm sm:text-base text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
            종료일
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-lounge-surface border border-lounge-border rounded-lg p-3 text-sm sm:text-base text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
            표시 수
          </label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-lounge-surface border border-lounge-border rounded-lg p-3 text-sm sm:text-base text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200"
          >
            <option value={5}>5개</option>
            <option value={10}>10개</option>
            <option value={15}>15개</option>
            <option value={20}>20개</option>
          </select>
        </div>
      </div>

      {/* Popular Menus */}
      {popularMenus && (
        <section>
          <h2 className="text-xl font-PretendardBold mb-4">
            인기 메뉴 (총 {popularMenus.totalClicks?.toLocaleString()}클릭)
          </h2>
          <div className="bg-lounge-card rounded-xl p-4 mb-4 border border-lounge-border">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={popularMenus.menus}
                layout="vertical"
                margin={{ left: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis type="number" stroke="#6B6360" tick={{ fill: '#A89B8C' }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#6B6360"
                  tick={{ fontSize: 12, fill: '#A89B8C' }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    borderRadius: '8px',
                    color: '#F5F0EB',
                  }}
                />
                <Bar dataKey="clicks" fill="#C8956C" name="클릭수" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {popularMenus.menus?.map(
              (menu: any, index: number) => (
                <div
                  key={menu.productId}
                  className="flex items-center justify-between p-3 bg-lounge-card rounded-lg border border-lounge-border hover:border-lounge-gold/20 transition-colors"
                >
                  <div className="flex items-center">
                    <span className={`w-8 text-center font-PretendardBold text-lg ${index < 3 ? 'text-lounge-gold' : 'text-lounge-text-secondary'}`}>
                      {index + 1}
                    </span>
                    <span className="font-PretendardMedium">{menu.name}</span>
                  </div>
                  <span className="font-PretendardSemiBold text-lounge-gold">
                    {menu.clicks?.toLocaleString()}회
                  </span>
                </div>
              )
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminStatisticsPage;
