import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProductDetailAdminAPI,
  createProductAPI,
  updateProductAPI,
  getCategoriesAPI,
} from '@api/admin/adminAPI';
import { X, Images, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@context/ToastContext';
import ImageGallery from '@components/admin/ImageGallery';
import { getImageUrl } from '@lib/axiosConfig';

interface Category {
  id: number;
  categoryName: string;
  categoryEngName?: string;
}

interface ProductFormData {
  name: string;
  engName: string | null;
  description: string | null;
  price: number | '' | null;
  categoryId: number | '' | null;
  imageUrl: string | null;
}

interface ProductEditModalProps {
  productId: number | null;
  onClose: () => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({
  productId,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const isEditing = productId !== null;

  const [name, setName] = useState('');
  const [engName, setEngName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: getCategoriesAPI,
  });

  const { data: productDetail } = useQuery({
    queryKey: ['adminProductDetail', productId],
    queryFn: () => getProductDetailAdminAPI(productId!),
    enabled: isEditing,
  });

  useEffect(() => {
    if (productDetail) {
      setName(productDetail.name || '');
      setEngName(productDetail.engName || '');
      setDescription(productDetail.description || '');
      setPrice(productDetail.price || '');
      setCategoryId(productDetail.categoryId || '');
      setImageUrl(productDetail.imageUrl || null);
    }
  }, [productDetail]);

  const createMutation = useMutation({
    mutationFn: createProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
      onClose();
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProductFormData) => updateProductAPI(productId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
      onClose();
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const handleGallerySelect = useCallback((url: string) => {
    setImageUrl(url);
  }, []);

  const handleGalleryDeselect = useCallback(() => {
    setImageUrl(null);
  }, []);

  const removeImage = () => {
    setImageUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      engName: engName || null,
      description: description || null,
      price: price || null,
      categoryId: categoryId || null,
      imageUrl: imageUrl || null,
    };

    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-lounge-card w-full max-w-md sm:max-w-lg rounded-xl shadow-lounge-lg relative max-h-[90vh] overflow-y-auto border border-lounge-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-lounge-border">
          <h2 className="text-xl font-PretendardBold text-lounge-text">
            {isEditing ? '메뉴 수정' : '메뉴 추가'}
          </h2>
          <button onClick={onClose} className="text-lounge-text-muted hover:text-lounge-text transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
              메뉴명 *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
              영문명
            </label>
            <input
              type="text"
              value={engName}
              onChange={(e) => setEngName(e.target.value)}
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
              가격 *
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === '' ? '' : Number(e.target.value))
              }
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
              카테고리 *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full bg-lounge-surface border border-lounge-border rounded-lg p-3 text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200"
              required
            >
              <option value="">선택하세요</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                  {cat.categoryEngName ? ` (${cat.categoryEngName})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-PretendardMedium text-lounge-text-secondary mb-1">
              이미지
            </label>

            {/* Selected image preview */}
            {imageUrl && (
              <div className="flex gap-2 flex-wrap mb-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-lounge-border group">
                  <img
                    src={getImageUrl(imageUrl)}
                    alt="상품 이미지"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 hover:bg-lounge-danger flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </div>
              </div>
            )}

            {/* Gallery toggle button */}
            <button
              type="button"
              onClick={() => setShowGallery(!showGallery)}
              className="flex items-center gap-2 text-lounge-gold hover:text-lounge-gold-light font-PretendardMedium text-sm transition-colors py-2"
            >
              <Images size={16} />
              이미지 라이브러리에서 선택
              {showGallery ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>

            {/* Collapsible gallery section */}
            {showGallery && (
              <div className="mt-2 p-3 bg-lounge-surface/50 rounded-lg border border-lounge-border">
                <ImageGallery
                  imageType="PRODUCT"
                  selectable
                  selectedUrls={imageUrl ? [imageUrl] : []}
                  onSelect={handleGallerySelect}
                  onDeselect={handleGalleryDeselect}
                />
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="w-full bg-lounge-gold hover:bg-lounge-gold-dark disabled:bg-lounge-gold-dark/40 disabled:text-lounge-text-muted text-lounge-bg py-3 rounded-lg font-PretendardBold transition-all duration-200 shadow-gold-glow active:scale-[0.99]"
            >
              {createMutation.isPending || updateMutation.isPending
                ? '저장 중...'
                : isEditing
                  ? '수정'
                  : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
