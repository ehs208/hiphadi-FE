import React, { useState, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getLibraryImagesAPI,
  uploadLibraryImageAPI,
  deleteLibraryImageAPI,
  LibraryImage,
} from '@api/admin/imageAPI';
import { Upload, X, Check, Loader2, ImageOff } from 'lucide-react';
import { useToast } from '@context/ToastContext';
import { getImageUrl } from '@lib/axiosConfig';

interface ImageGalleryProps {
  imageType: 'HEADER' | 'PRODUCT';
  selectable?: boolean;
  selectedUrls?: string[];
  onSelect?: (url: string) => void;
  onDeselect?: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageType,
  selectable = false,
  selectedUrls = [],
  onSelect,
  onDeselect,
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const {
    data: images,
    isLoading,
    isError,
  } = useQuery<LibraryImage[]>({
    queryKey: ['libraryImages', imageType],
    queryFn: () => getLibraryImagesAPI(imageType),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLibraryImageAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraryImages', imageType] });
      setDeletingId(null);
    },
    onError: (error: Error) => {
      showToast(error.message);
      setDeletingId(null);
    },
  });

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploading(true);
      try {
        await uploadLibraryImageAPI(file, imageType);
        queryClient.invalidateQueries({
          queryKey: ['libraryImages', imageType],
        });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '이미지 업로드에 실패했습니다.';
        showToast(message);
      } finally {
        setUploading(false);
        // Reset file input so the same file can be uploaded again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [imageType, queryClient, showToast]
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (window.confirm('이미지를 삭제하시겠습니까?\n\n이 이미지를 사용 중인 메뉴에서도 표시되지 않습니다.')) {
        setDeletingId(id);
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation]
  );

  const handleImageClick = useCallback(
    (url: string) => {
      if (!selectable) return;

      const isSelected = selectedUrls.includes(url);
      if (isSelected) {
        onDeselect?.(url);
      } else {
        onSelect?.(url);
      }
    },
    [selectable, selectedUrls, onSelect, onDeselect]
  );

  const getSelectionIndex = useCallback(
    (url: string): number => {
      return selectedUrls.indexOf(url);
    },
    [selectedUrls]
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2
          className="animate-spin text-lounge-gold"
          size={28}
        />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-lounge-text-secondary font-PretendardMedium">
          이미지를 불러오는 데 실패했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Upload button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2.5 bg-lounge-surface border border-lounge-border rounded-lg text-lounge-text-secondary hover:text-lounge-gold hover:border-lounge-gold/30 transition-all duration-200 font-PretendardMedium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            업로드 중...
          </>
        ) : (
          <>
            <Upload size={16} />
            이미지 업로드
          </>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
        onChange={handleUpload}
        className="hidden"
        disabled={uploading}
      />

      {/* Empty state */}
      {(!images || images.length === 0) && (
        <div className="flex flex-col items-center justify-center py-12 text-lounge-text-muted">
          <ImageOff size={40} className="mb-3 opacity-60" />
          <p className="font-PretendardMedium text-sm">
            등록된 이미지가 없습니다
          </p>
          <p className="font-PretendardRegular text-xs mt-1 text-lounge-text-muted/70">
            위 버튼을 눌러 이미지를 업로드하세요
          </p>
        </div>
      )}

      {/* Image grid */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((image) => {
            const isSelected = selectedUrls.includes(image.url);
            const selectionIndex = getSelectionIndex(image.url);

            return (
              <div
                key={image.id}
                className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  isSelected
                    ? 'border-lounge-gold shadow-gold-glow'
                    : 'border-lounge-border hover:border-lounge-border/80'
                } ${selectable ? 'cursor-pointer' : ''}`}
                onClick={() => handleImageClick(image.url)}
              >
                {/* Image thumbnail */}
                <div className="aspect-[4/3] bg-lounge-surface">
                  <img
                    src={getImageUrl(image.url)}
                    alt={image.originalFilename}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Filename overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-xs text-lounge-text truncate font-PretendardRegular">
                    {image.originalFilename}
                  </p>
                </div>

                {/* Selection badge with order number */}
                {selectable && isSelected && (
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-lounge-gold flex items-center justify-center shadow-lg">
                    {selectionIndex >= 0 ? (
                      <span className="text-xs font-PretendardBold text-lounge-bg">
                        {selectionIndex + 1}
                      </span>
                    ) : (
                      <Check size={14} className="text-lounge-bg" />
                    )}
                  </div>
                )}

                {/* Selectable but not selected: show empty circle */}
                {selectable && !isSelected && (
                  <div className="absolute top-2 left-2 w-7 h-7 rounded-full border-2 border-white/40 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}

                {/* Delete button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(image.id);
                  }}
                  disabled={deletingId === image.id}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-lounge-danger flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  {deletingId === image.id ? (
                    <Loader2
                      size={12}
                      className="animate-spin text-white"
                    />
                  ) : (
                    <X size={14} className="text-white" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
