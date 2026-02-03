import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, Info } from 'lucide-react';
import ImageGallery from '@components/admin/ImageGallery';
import {
  getActiveHeaderImagesAPI,
  updateHeaderImagesAPI,
  LibraryImage,
} from '@api/admin/imageAPI';
import { useToast } from '@context/ToastContext';
import { getImageUrl } from '@lib/axiosConfig';

type TabType = 'HEADER' | 'PRODUCT';

const AdminImagePage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('HEADER');
  const [selectedHeaderUrls, setSelectedHeaderUrls] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch currently active header images to pre-select them
  const { data: activeHeaderImages, isLoading: isLoadingActive } = useQuery<
    LibraryImage[]
  >({
    queryKey: ['activeHeaderImages'],
    queryFn: getActiveHeaderImagesAPI,
    enabled: activeTab === 'HEADER',
  });

  // Pre-select active header images on load (once)
  useEffect(() => {
    if (activeHeaderImages && !isInitialized) {
      const sortedUrls = [...activeHeaderImages]
        .sort((a, b) => (a.headerDisplayOrder ?? 0) - (b.headerDisplayOrder ?? 0))
        .map((img) => img.url);
      setSelectedHeaderUrls(sortedUrls);
      setIsInitialized(true);
    }
  }, [activeHeaderImages, isInitialized]);

  // Reset initialization when switching back to header tab
  useEffect(() => {
    if (activeTab === 'HEADER') {
      setIsInitialized(false);
    }
  }, [activeTab]);

  const updateMutation = useMutation({
    mutationFn: updateHeaderImagesAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeHeaderImages'] });
      queryClient.invalidateQueries({ queryKey: ['publicHeaderImages'] });
      showToast('헤더 이미지가 저장되었습니다.');
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const handleHeaderSelect = useCallback((url: string) => {
    setSelectedHeaderUrls((prev) => [...prev, url]);
  }, []);

  const handleHeaderDeselect = useCallback((url: string) => {
    setSelectedHeaderUrls((prev) => prev.filter((u) => u !== url));
  }, []);

  const handleSaveHeaderImages = useCallback(() => {
    if (selectedHeaderUrls.length === 0) {
      showToast('최소 1개의 이미지를 선택해주세요.');
      return;
    }
    updateMutation.mutate(selectedHeaderUrls);
  }, [selectedHeaderUrls, updateMutation, showToast]);

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
        <h1 className="text-2xl font-PretendardExtraBold">이미지 관리</h1>
      </div>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('HEADER')}
          className={`px-4 py-2.5 rounded-lg font-PretendardBold text-sm transition-all duration-200 ${
            activeTab === 'HEADER'
              ? 'bg-lounge-gold text-lounge-bg shadow-gold-glow'
              : 'bg-lounge-surface text-lounge-text-secondary border border-lounge-border hover:border-lounge-gold/30'
          }`}
        >
          헤더 이미지
        </button>
        <button
          onClick={() => setActiveTab('PRODUCT')}
          className={`px-4 py-2.5 rounded-lg font-PretendardBold text-sm transition-all duration-200 ${
            activeTab === 'PRODUCT'
              ? 'bg-lounge-gold text-lounge-bg shadow-gold-glow'
              : 'bg-lounge-surface text-lounge-text-secondary border border-lounge-border hover:border-lounge-gold/30'
          }`}
        >
          메뉴 이미지
        </button>
      </div>

      {/* Header tab content */}
      {activeTab === 'HEADER' && (
        <div className="space-y-6">
          {/* Current selection info */}
          <div className="bg-lounge-card rounded-xl p-4 border border-lounge-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-PretendardBold text-lounge-text">
                  메인 페이지 헤더
                </h2>
                <p className="text-xs font-PretendardRegular text-lounge-text-muted mt-0.5">
                  이미지를 클릭하여 선택하고, 선택 순서대로 슬라이더에
                  표시됩니다
                </p>
              </div>
              <span className="text-sm font-PretendardMedium text-lounge-gold">
                {selectedHeaderUrls.length}개 선택
              </span>
            </div>

            {/* Selected images preview in order */}
            {selectedHeaderUrls.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
                {selectedHeaderUrls.map((url, index) => (
                  <div
                    key={url}
                    className="relative flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border border-lounge-gold/50"
                  >
                    <img
                      src={getImageUrl(url)}
                      alt={`순서 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-lounge-gold flex items-center justify-center">
                      <span className="text-[10px] font-PretendardBold text-lounge-bg">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Save button */}
            <button
              onClick={handleSaveHeaderImages}
              disabled={
                updateMutation.isPending ||
                isLoadingActive ||
                selectedHeaderUrls.length === 0
              }
              className="w-full flex items-center justify-center gap-2 bg-lounge-gold hover:bg-lounge-gold-dark disabled:bg-lounge-gold-dark/40 disabled:text-lounge-text-muted text-lounge-bg py-2.5 rounded-lg font-PretendardBold text-sm transition-all duration-200 shadow-gold-glow active:scale-[0.99]"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save size={16} />
                  선택한 이미지 적용
                </>
              )}
            </button>
          </div>

          {/* Recommended specs */}
          <div className="flex items-start gap-3 bg-lounge-surface/60 rounded-xl p-4 border border-lounge-border/50">
            <Info size={18} className="text-lounge-gold flex-shrink-0 mt-0.5" />
            <div className="text-xs font-PretendardRegular text-lounge-text-secondary space-y-1">
              <p className="font-PretendardBold text-lounge-text text-sm mb-1">
                권장 사양
              </p>
              <p>
                <span className="text-lounge-gold">크기:</span>{' '}
                1920 x 600px (가로로 넓은 비율)
              </p>
              <p>
                <span className="text-lounge-gold">확장자:</span>{' '}
                JPG, WebP 권장 (PNG, GIF, SVG 가능)
              </p>
              <p>
                <span className="text-lounge-gold">용량:</span>{' '}
                최대 10MB, 1MB 이하 권장
              </p>
            </div>
          </div>

          {/* Gallery grid */}
          <div className="bg-lounge-card rounded-xl p-4 border border-lounge-border">
            <h3 className="text-sm font-PretendardBold text-lounge-text-secondary mb-3">
              이미지 라이브러리
            </h3>
            <ImageGallery
              imageType="HEADER"
              selectable
              selectedUrls={selectedHeaderUrls}
              onSelect={handleHeaderSelect}
              onDeselect={handleHeaderDeselect}
            />
          </div>
        </div>
      )}

      {/* Product tab content */}
      {activeTab === 'PRODUCT' && (
        <div className="space-y-6">
          <div className="bg-lounge-card rounded-xl p-4 border border-lounge-border">
            <div className="mb-3">
              <h2 className="text-base font-PretendardBold text-lounge-text">
                메뉴 이미지 라이브러리
              </h2>
              <p className="text-xs font-PretendardRegular text-lounge-text-muted mt-0.5">
                메뉴에 사용할 이미지를 업로드하고 관리합니다. 메뉴
                추가/수정 시 여기에서 선택할 수 있습니다.
              </p>
            </div>
            <ImageGallery imageType="PRODUCT" />
          </div>

          {/* Recommended specs */}
          <div className="flex items-start gap-3 bg-lounge-surface/60 rounded-xl p-4 border border-lounge-border/50">
            <Info size={18} className="text-lounge-gold flex-shrink-0 mt-0.5" />
            <div className="text-xs font-PretendardRegular text-lounge-text-secondary space-y-1">
              <p className="font-PretendardBold text-lounge-text text-sm mb-1">
                권장 사양
              </p>
              <p>
                <span className="text-lounge-gold">크기:</span>{' '}
                800 x 800px (1:1 정사각형) 또는 800 x 600px (4:3)
              </p>
              <p>
                <span className="text-lounge-gold">확장자:</span>{' '}
                JPG, WebP 권장 (PNG, GIF, SVG 가능)
              </p>
              <p>
                <span className="text-lounge-gold">용량:</span>{' '}
                최대 10MB, 500KB 이하 권장
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminImagePage;
