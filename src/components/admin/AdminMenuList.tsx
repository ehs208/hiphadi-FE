import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Pencil, Trash2, Plus, Ban, Star, StarOff, GripVertical, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  getProductsAdminAPI,
  deleteProductAPI,
  toggleProductStatusAPI,
  toggleProductRecommendAPI,
  reorderCategoriesAPI,
  reorderProductsAPI,
} from '@api/admin/adminAPI';
import ProductEditModal from './ProductEditModal';
import { useToast } from '@context/ToastContext';

interface ProductListData {
  id: number;
  name: string;
  engName: string;
  description: string;
  price: number | null;
  category: string;
  categoryEngName?: string;
  categoryId: number;
  status: string;
  isRecommend: string;
}

interface CategoryGroup {
  categoryId: number;
  categoryName: string;
  categoryEngName?: string;
  products: ProductListData[];
}

// --- Sortable Category Component ---
const SortableCategory: React.FC<{
  group: CategoryGroup;
  isDragMode: boolean;
}> = ({ group, isDragMode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `cat-${group.categoryId}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="text-xl font-PretendardExtraBold mb-2 flex items-center border-b border-lounge-border pb-2">
        {isDragMode && (
          <button
            {...attributes}
            {...listeners}
            className="mr-2 cursor-grab active:cursor-grabbing p-1 text-lounge-text-secondary hover:text-lounge-gold transition-colors rounded"
          >
            <GripVertical size={20} />
          </button>
        )}
        <span>{group.categoryName}</span>
        {group.categoryEngName && (
          <span className="ml-2 text-sm font-PretendardLight text-lounge-text-secondary">
            {group.categoryEngName}
          </span>
        )}
      </div>
    </div>
  );
};

// --- Sortable Product Item Component ---
const SortableProductItem: React.FC<{
  item: ProductListData;
  isDragMode: boolean;
  formatPrice: (price: number | null) => string;
  onToggleStatus: (id: number) => void;
  onToggleRecommend: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}> = ({ item, isDragMode, formatPrice, onToggleStatus, onToggleRecommend, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `prod-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col sm:flex-row sm:items-start p-3 sm:p-4 shadow-lounge overflow-hidden rounded-lg mb-2 transition-all duration-300 border ${
        item.status === 'SOLD_OUT'
          ? 'bg-lounge-surface/50 opacity-50 border-lounge-border/30'
          : 'bg-lounge-card border-lounge-border hover:border-lounge-border'
      }`}
    >
      <div className="flex items-start w-full sm:w-auto sm:flex-1 min-w-0">
      {isDragMode && (
        <button
          {...attributes}
          {...listeners}
          className="mr-3 cursor-grab active:cursor-grabbing p-1 text-lounge-text-secondary hover:text-lounge-gold transition-colors rounded self-center flex-shrink-0"
        >
          <GripVertical size={18} />
        </button>
      )}
      <div className="flex-1 min-w-0 sm:mr-3">
        <div className="font-PretendardBold flex flex-col text-base sm:text-lg">
          <div className="flex items-center min-w-0 relative overflow-hidden">
            <span className="truncate leading-tight">
              {item.name}
            </span>
            {item.engName && (
              <span className="ml-2 text-sm font-PretendardLight text-lounge-text-secondary truncate">
                {item.engName}
              </span>
            )}
            {item.isRecommend === 'RECOMMEND' && (
              <Star
                size={14}
                className="flex-shrink-0 ml-1 text-lounge-gold fill-lounge-gold drop-shadow-[0_0_4px_rgba(200,149,108,0.6)]"
                style={{ marginTop: '-2px' }}
              />
            )}
          </div>
          {item.status === 'SOLD_OUT' && (
            <div className="text-sm font-PretendardSemiBold text-lounge-danger mt-0.5">
              품절
            </div>
          )}
        </div>
        <div className="text-sm font-PretendardMedium truncate mt-1 text-lounge-text-secondary">
          {item.description}
        </div>
      </div>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start mt-2 sm:mt-0 sm:space-y-2 flex-shrink-0">
        <div className="font-PretendardSemiBold text-base whitespace-nowrap text-lounge-gold-light">
          {formatPrice(item.price)}
        </div>
        {!isDragMode && (
          <div className="grid grid-cols-4 sm:flex sm:space-x-1 gap-0.5">
            <button
              onClick={() => onToggleStatus(item.id)}
              className={`p-2 rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95 ${
                item.status === 'SOLD_OUT'
                  ? 'text-lounge-success hover:bg-lounge-card-hover'
                  : 'text-lounge-danger hover:bg-lounge-card-hover'
              }`}
              title={item.status === 'SOLD_OUT' ? '판매 재개' : '품절 처리'}
            >
              <Ban size={16} />
            </button>
            <button
              onClick={() => onToggleRecommend(item.id)}
              className={`p-2 rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95 ${
                item.isRecommend === 'RECOMMEND'
                  ? 'text-lounge-gold hover:bg-lounge-card-hover'
                  : 'text-lounge-text-muted hover:bg-lounge-card-hover'
              }`}
              title={item.isRecommend === 'RECOMMEND' ? '추천 해제' : '추천 설정'}
            >
              {item.isRecommend === 'RECOMMEND' ? <Star size={16} /> : <StarOff size={16} />}
            </button>
            <button
              onClick={() => onEdit(item.id)}
              className="p-2 text-lounge-gold hover:bg-lounge-card-hover rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 text-lounge-danger hover:bg-lounge-card-hover rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main AdminMenuList Component ---
const AdminMenuList: React.FC = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [isDragMode, setIsDragMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [movedItemId, setMovedItemId] = useState<string | null>(null);

  // Clear the moved item highlight after animation duration
  useEffect(() => {
    if (movedItemId) {
      const timer = setTimeout(() => setMovedItemId(null), 600);
      return () => clearTimeout(timer);
    }
  }, [movedItemId]);

  const highlightMovedItem = useCallback((id: string) => {
    setMovedItemId(id);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const { data, error, isLoading } = useQuery<ProductListData[]>({
    queryKey: ['adminProducts'],
    queryFn: getProductsAdminAPI,
    refetchOnMount: 'always',
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: toggleProductStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const toggleRecommendMutation = useMutation({
    mutationFn: toggleProductRecommendAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const reorderCategoriesMutation = useMutation({
    mutationFn: reorderCategoriesAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const reorderProductsMutation = useMutation({
    mutationFn: reorderProductsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProducts'] });
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  // Build ordered category groups from flat product list
  const categoryGroups: CategoryGroup[] = useMemo(() => {
    if (!data) return [];
    const seen = new Map<number, CategoryGroup>();
    const ordered: CategoryGroup[] = [];
    for (const product of data) {
      let group = seen.get(product.categoryId);
      if (!group) {
        group = {
          categoryId: product.categoryId,
          categoryName: product.category,
          categoryEngName: product.categoryEngName,
          products: [],
        };
        seen.set(product.categoryId, group);
        ordered.push(group);
      }
      group.products.push(product);
    }
    return ordered;
  }, [data]);

  const categoryIds = useMemo(
    () => categoryGroups.map((g) => `cat-${g.categoryId}`),
    [categoryGroups],
  );

  const handleDelete = (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleCreate = () => {
    setEditProductId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    setEditProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditProductId(null);
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return '설명참조';
    return `${price.toLocaleString()}원`;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeStr = String(active.id);
    const overStr = String(over.id);

    // Category reorder
    if (activeStr.startsWith('cat-') && overStr.startsWith('cat-')) {
      const oldIndex = categoryIds.indexOf(activeStr);
      const newIndex = categoryIds.indexOf(overStr);
      if (oldIndex === -1 || newIndex === -1) return;
      const newOrder = arrayMove(categoryGroups, oldIndex, newIndex);
      const reorderedIds = newOrder.map((g) => g.categoryId);
      reorderCategoriesMutation.mutate(reorderedIds);
      return;
    }

    // Product reorder within same category
    if (activeStr.startsWith('prod-') && overStr.startsWith('prod-')) {
      const activeProductId = Number(activeStr.replace('prod-', ''));
      const overProductId = Number(overStr.replace('prod-', ''));

      // Find which category contains the active product
      const group = categoryGroups.find((g) =>
        g.products.some((p) => p.id === activeProductId),
      );
      if (!group) return;

      // Ensure over product is in the same category
      const overInSameGroup = group.products.some((p) => p.id === overProductId);
      if (!overInSameGroup) return;

      const oldIndex = group.products.findIndex((p) => p.id === activeProductId);
      const newIndex = group.products.findIndex((p) => p.id === overProductId);
      if (oldIndex === -1 || newIndex === -1) return;

      const newOrder = arrayMove(group.products, oldIndex, newIndex);
      const reorderedIds = newOrder.map((p) => p.id);
      reorderProductsMutation.mutate(reorderedIds);
    }
  };

  // --- Mobile reorder handlers (up/down arrow buttons) ---
  const handleMoveCategoryUp = (index: number) => {
    if (index === 0 || reorderCategoriesMutation.isPending) return;
    const movedCatId = categoryGroups[index].categoryId;
    const newOrder = [...categoryGroups];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    reorderCategoriesMutation.mutate(newOrder.map((g) => g.categoryId));
    highlightMovedItem(`cat-${movedCatId}`);
  };

  const handleMoveCategoryDown = (index: number) => {
    if (index >= categoryGroups.length - 1 || reorderCategoriesMutation.isPending) return;
    const movedCatId = categoryGroups[index].categoryId;
    const newOrder = [...categoryGroups];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    reorderCategoriesMutation.mutate(newOrder.map((g) => g.categoryId));
    highlightMovedItem(`cat-${movedCatId}`);
  };

  const handleMoveProductUp = (categoryId: number, productIndex: number) => {
    const group = categoryGroups.find((g) => g.categoryId === categoryId);
    if (!group || productIndex === 0 || reorderProductsMutation.isPending) return;
    const movedProdId = group.products[productIndex].id;
    const newProducts = [...group.products];
    [newProducts[productIndex - 1], newProducts[productIndex]] = [newProducts[productIndex], newProducts[productIndex - 1]];
    reorderProductsMutation.mutate(newProducts.map((p) => p.id));
    highlightMovedItem(`prod-${movedProdId}`);
  };

  const handleMoveProductDown = (categoryId: number, productIndex: number) => {
    const group = categoryGroups.find((g) => g.categoryId === categoryId);
    if (!group || productIndex >= group.products.length - 1 || reorderProductsMutation.isPending) return;
    const movedProdId = group.products[productIndex].id;
    const newProducts = [...group.products];
    [newProducts[productIndex], newProducts[productIndex + 1]] = [newProducts[productIndex + 1], newProducts[productIndex]];
    reorderProductsMutation.mutate(newProducts.map((p) => p.id));
    highlightMovedItem(`prod-${movedProdId}`);
  };

  const isMobileReordering = reorderCategoriesMutation.isPending || reorderProductsMutation.isPending;

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lounge-text">
        <div className="text-lg font-PretendardMedium">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-lounge-danger">
        <div className="text-lg font-PretendardMedium">
          Error: {error.message}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-y-4 text-lounge-text p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h1 className="text-2xl font-PretendardExtraBold">메뉴 관리</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDragMode(!isDragMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-PretendardMedium active:scale-[0.98] ${
              isDragMode
                ? 'bg-lounge-gold text-lounge-bg shadow-gold-glow'
                : 'bg-lounge-surface text-lounge-text-secondary border border-lounge-border hover:border-lounge-gold-light'
            }`}
          >
            <ArrowUpDown size={18} />
            {isDragMode ? '변경 완료' : '순서 변경'}
          </button>
          {!isDragMode && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 bg-lounge-gold hover:bg-lounge-gold-dark text-lounge-bg px-4 py-2.5 rounded-lg transition-all duration-200 font-PretendardMedium shadow-gold-glow active:scale-[0.98]"
            >
              <Plus size={18} />
              메뉴 추가
            </button>
          )}
        </div>
      </div>

      {isDragMode ? (
        <>
          {/* Desktop: DnD grip handles (hidden on mobile) */}
          <div className="hidden sm:block">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {/* Category-level sorting */}
              <SortableContext items={categoryIds} strategy={verticalListSortingStrategy}>
                {categoryGroups.map((group) => {
                  const productSortIds = group.products.map((p) => `prod-${p.id}`);
                  return (
                    <div key={group.categoryId}>
                      <SortableCategory group={group} isDragMode={isDragMode} />
                      {/* Product-level sorting within category */}
                      <SortableContext items={productSortIds} strategy={verticalListSortingStrategy}>
                        {group.products.map((item) => (
                          <SortableProductItem
                            key={item.id}
                            item={item}
                            isDragMode={isDragMode}
                            formatPrice={formatPrice}
                            onToggleStatus={(id) => toggleStatusMutation.mutate(id)}
                            onToggleRecommend={(id) => toggleRecommendMutation.mutate(id)}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                          />
                        ))}
                      </SortableContext>
                    </div>
                  );
                })}
              </SortableContext>
              <DragOverlay>
                {activeId && activeId.startsWith('cat-') && (
                  <div className="text-xl font-PretendardExtraBold p-2 bg-lounge-surface rounded-lg border border-lounge-gold shadow-gold-glow">
                    {categoryGroups.find((g) => `cat-${g.categoryId}` === activeId)?.categoryName}
                  </div>
                )}
                {activeId && activeId.startsWith('prod-') && (() => {
                  const prodId = Number(activeId.replace('prod-', ''));
                  const item = data?.find((p) => p.id === prodId);
                  if (!item) return null;
                  return (
                    <div className="flex items-start p-4 shadow-gold-glow overflow-hidden rounded-lg border border-lounge-gold bg-lounge-card">
                      <div className="mr-3 p-1 text-lounge-gold self-center flex-shrink-0">
                        <GripVertical size={18} />
                      </div>
                      <div className="flex-1 min-w-0 mr-3">
                        <div className="font-PretendardBold text-base sm:text-lg">
                          {item.name}
                        </div>
                      </div>
                      <div className="font-PretendardSemiBold text-base whitespace-nowrap text-lounge-gold-light">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  );
                })()}
              </DragOverlay>
            </DndContext>
          </div>

          {/* Mobile: Up/Down arrow buttons (hidden on sm+) */}
          <div className="block sm:hidden">
            {categoryGroups.map((group, categoryIndex) => (
              <div key={group.categoryId} className="mb-4">
                {/* Category header with reorder arrows */}
                <div className={`flex items-center p-3 bg-lounge-card rounded-lg mb-2 transition-all duration-300 border ${
                  movedItemId === `cat-${group.categoryId}`
                    ? 'border-lounge-gold shadow-gold-glow'
                    : 'border-lounge-border'
                }`}>
                  <div className="flex flex-col mr-2">
                    <button
                      onClick={() => handleMoveCategoryUp(categoryIndex)}
                      disabled={categoryIndex === 0 || isMobileReordering}
                      className={`p-1.5 rounded-lg transition-colors ${
                        categoryIndex === 0 || isMobileReordering
                          ? 'opacity-30 cursor-not-allowed text-lounge-text-secondary'
                          : 'text-lounge-text-secondary hover:text-lounge-gold active:bg-lounge-surface'
                      }`}
                      aria-label={`${group.categoryName} 카테고리를 위로 이동`}
                    >
                      <ChevronUp size={18} />
                    </button>
                    <button
                      onClick={() => handleMoveCategoryDown(categoryIndex)}
                      disabled={categoryIndex === categoryGroups.length - 1 || isMobileReordering}
                      className={`p-1.5 rounded-lg transition-colors ${
                        categoryIndex === categoryGroups.length - 1 || isMobileReordering
                          ? 'opacity-30 cursor-not-allowed text-lounge-text-secondary'
                          : 'text-lounge-text-secondary hover:text-lounge-gold active:bg-lounge-surface'
                      }`}
                      aria-label={`${group.categoryName} 카테고리를 아래로 이동`}
                    >
                      <ChevronDown size={18} />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-lg font-PretendardExtraBold truncate">{group.categoryName}</span>
                    {group.categoryEngName && (
                      <span className="ml-2 text-sm font-PretendardLight text-lounge-text-secondary">
                        {group.categoryEngName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Products within category with reorder arrows */}
                {group.products.map((item, productIndex) => (
                  <div
                    key={item.id}
                    className={`flex items-center p-3 rounded-lg mb-2 transition-all duration-300 border ${
                      movedItemId === `prod-${item.id}`
                        ? 'border-lounge-gold shadow-gold-glow'
                        : item.status === 'SOLD_OUT'
                          ? 'bg-lounge-surface/50 opacity-50 border-lounge-border/30'
                          : 'bg-lounge-card border-lounge-border'
                    }`}
                  >
                    <div className="flex flex-col mr-2 flex-shrink-0">
                      <button
                        onClick={() => handleMoveProductUp(group.categoryId, productIndex)}
                        disabled={productIndex === 0 || isMobileReordering}
                        className={`p-1.5 rounded-lg transition-colors ${
                          productIndex === 0 || isMobileReordering
                            ? 'opacity-30 cursor-not-allowed text-lounge-text-secondary'
                            : 'text-lounge-text-secondary hover:text-lounge-gold active:bg-lounge-surface'
                        }`}
                        aria-label={`${item.name}을(를) 위로 이동`}
                      >
                        <ChevronUp size={18} />
                      </button>
                      <button
                        onClick={() => handleMoveProductDown(group.categoryId, productIndex)}
                        disabled={productIndex === group.products.length - 1 || isMobileReordering}
                        className={`p-1.5 rounded-lg transition-colors ${
                          productIndex === group.products.length - 1 || isMobileReordering
                            ? 'opacity-30 cursor-not-allowed text-lounge-text-secondary'
                            : 'text-lounge-text-secondary hover:text-lounge-gold active:bg-lounge-surface'
                        }`}
                        aria-label={`${item.name}을(를) 아래로 이동`}
                      >
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center min-w-0">
                        <span className="font-PretendardBold truncate">{item.name}</span>
                        {item.isRecommend === 'RECOMMEND' && (
                          <Star
                            size={14}
                            className="flex-shrink-0 ml-1 text-lounge-gold fill-lounge-gold drop-shadow-[0_0_4px_rgba(200,149,108,0.6)]"
                          />
                        )}
                      </div>
                      {item.status === 'SOLD_OUT' && (
                        <div className="text-xs font-PretendardSemiBold text-lounge-danger mt-0.5">
                          품절
                        </div>
                      )}
                    </div>
                    <div className="font-PretendardSemiBold text-sm whitespace-nowrap text-lounge-gold-light ml-2 flex-shrink-0">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        // Non-drag mode: original static list
        categoryGroups.map((group) => (
          <div key={group.categoryId}>
            <div className="text-xl font-PretendardExtraBold mb-2 flex items-center border-b border-lounge-border pb-2">
              <span>{group.categoryName}</span>
              {group.categoryEngName && (
                <span className="ml-2 text-sm font-PretendardLight text-lounge-text-secondary">
                  {group.categoryEngName}
                </span>
              )}
            </div>
            {group.products.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col sm:flex-row sm:items-start p-3 sm:p-4 shadow-lounge overflow-hidden rounded-lg mb-2 transition-all duration-300 border ${
                  item.status === 'SOLD_OUT'
                    ? 'bg-lounge-surface/50 opacity-50 border-lounge-border/30'
                    : 'bg-lounge-card border-lounge-border hover:border-lounge-border'
                }`}
              >
                <div className="flex-1 min-w-0 sm:mr-3">
                  <div className="font-PretendardBold flex flex-col text-base sm:text-lg">
                    <div className="flex items-center min-w-0 relative overflow-hidden">
                      <span className="truncate leading-tight">
                        {item.name}
                      </span>
                      {item.engName && (
                        <span className="ml-2 text-sm font-PretendardLight text-lounge-text-secondary truncate">
                          {item.engName}
                        </span>
                      )}
                      {item.isRecommend === 'RECOMMEND' && (
                        <Star
                          size={14}
                          className="flex-shrink-0 ml-1 text-lounge-gold fill-lounge-gold drop-shadow-[0_0_4px_rgba(200,149,108,0.6)]"
                          style={{ marginTop: '-2px' }}
                        />
                      )}
                    </div>
                    {item.status === 'SOLD_OUT' && (
                      <div className="text-sm font-PretendardSemiBold text-lounge-danger mt-0.5">
                        품절
                      </div>
                    )}
                  </div>
                  <div className="text-sm font-PretendardMedium truncate mt-1 text-lounge-text-secondary">
                    {item.description}
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start mt-2 sm:mt-0 sm:space-y-2 flex-shrink-0">
                  <div className="font-PretendardSemiBold text-base whitespace-nowrap text-lounge-gold-light">
                    {formatPrice(item.price)}
                  </div>
                  <div className="grid grid-cols-4 sm:flex sm:space-x-1 gap-0.5">
                    <button
                      onClick={() => toggleStatusMutation.mutate(item.id)}
                      className={`p-2 rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95 ${
                        item.status === 'SOLD_OUT'
                          ? 'text-lounge-success hover:bg-lounge-card-hover'
                          : 'text-lounge-danger hover:bg-lounge-card-hover'
                      }`}
                      title={item.status === 'SOLD_OUT' ? '판매 재개' : '품절 처리'}
                    >
                      <Ban size={16} />
                    </button>
                    <button
                      onClick={() => toggleRecommendMutation.mutate(item.id)}
                      className={`p-2 rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95 ${
                        item.isRecommend === 'RECOMMEND'
                          ? 'text-lounge-gold hover:bg-lounge-card-hover'
                          : 'text-lounge-text-muted hover:bg-lounge-card-hover'
                      }`}
                      title={item.isRecommend === 'RECOMMEND' ? '추천 해제' : '추천 설정'}
                    >
                      {item.isRecommend === 'RECOMMEND' ? <Star size={16} /> : <StarOff size={16} />}
                    </button>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-lounge-gold hover:bg-lounge-card-hover rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-lounge-danger hover:bg-lounge-card-hover rounded-full transition-all min-w-[32px] min-h-[32px] flex items-center justify-center active:scale-95"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {isModalOpen && (
        <ProductEditModal
          productId={editProductId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminMenuList;
