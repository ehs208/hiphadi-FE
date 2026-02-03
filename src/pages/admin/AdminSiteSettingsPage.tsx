import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import {
  getSiteSettingsAPI,
  updateSiteSettingsAPI,
  SiteSetting,
} from '@api/admin/siteSettingAPI';
import { useToast } from '@context/ToastContext';

const AdminSiteSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [introKo, setIntroKo] = useState('');
  const [introEn, setIntroEn] = useState('');
  const [bathroomPassword, setBathroomPassword] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: siteSettings, isLoading } = useQuery<SiteSetting[]>({
    queryKey: ['adminSiteSettings'],
    queryFn: getSiteSettingsAPI,
  });

  // Initialize form fields when data is loaded
  useEffect(() => {
    if (siteSettings && !isInitialized) {
      const getVal = (key: string) =>
        siteSettings.find((s) => s.settingKey === key)?.settingValue || '';
      setIntroKo(getVal('intro_ko'));
      setIntroEn(getVal('intro_en'));
      setBathroomPassword(getVal('bathroom_password'));
      setIsInitialized(true);
    }
  }, [siteSettings, isInitialized]);

  const updateMutation = useMutation({
    mutationFn: updateSiteSettingsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSiteSettings'] });
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
      showToast('업장 정보가 저장되었습니다.');
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      intro_ko: introKo,
      intro_en: introEn,
      bathroom_password: bathroomPassword,
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-lounge-bg text-lounge-text p-4 md:p-6">
      {/* Header with back navigation */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mr-4 text-lounge-text-secondary hover:text-lounge-gold transition-colors p-1"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-PretendardExtraBold">업장 정보 관리</h1>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="animate-spin text-lounge-gold" size={28} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Korean intro */}
          <div className="bg-lounge-card rounded-xl p-4 border border-lounge-border">
            <label className="block text-sm font-PretendardBold text-lounge-text mb-2">
              안내 문구 (한국어)
            </label>
            <textarea
              value={introKo}
              onChange={(e) => setIntroKo(e.target.value)}
              rows={3}
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-sm text-lounge-text font-PretendardRegular focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200 resize-none"
              placeholder="선택한 상품은 카운터에서 보여주세요 결제는 카운터에서!"
            />
          </div>

          {/* English intro */}
          <div className="bg-lounge-card rounded-xl p-4 border border-lounge-border">
            <label className="block text-sm font-PretendardBold text-lounge-text mb-2">
              안내 문구 (영문)
            </label>
            <textarea
              value={introEn}
              onChange={(e) => setIntroEn(e.target.value)}
              rows={3}
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-sm text-lounge-text font-PretendardRegular focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200 resize-none"
              placeholder="Please show your selected items at the counter. Payment is also at the counter!"
            />
          </div>

          {/* Bathroom password */}
          <div className="bg-lounge-card rounded-xl p-4 border border-lounge-border">
            <label className="block text-sm font-PretendardBold text-lounge-text mb-2">
              화장실 안내
            </label>
            <textarea
              value={bathroomPassword}
              onChange={(e) => setBathroomPassword(e.target.value)}
              rows={2}
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-sm text-lounge-text font-PretendardRegular focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200 resize-none"
              placeholder="화장실 비밀번호: 5456*"
            />
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-lounge-gold hover:bg-lounge-gold-dark disabled:bg-lounge-gold-dark/40 disabled:text-lounge-text-muted text-lounge-bg py-3 rounded-lg font-PretendardBold text-sm transition-all duration-200 shadow-gold-glow active:scale-[0.99]"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                저장 중...
              </>
            ) : (
              <>
                <Save size={16} />
                저장
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSiteSettingsPage;
