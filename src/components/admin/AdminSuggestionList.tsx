import React, { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSuggestionsAPI,
  deleteSuggestionAPI,
} from '@api/admin/adminAPI';
import { Trash2, Loader2, AlertCircle, Inbox } from 'lucide-react';
import { useToast } from '@context/ToastContext';

interface Suggestion {
  id: number;
  content: string;
  createdAt: string;
}

const formatKoreanDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
};

const AdminSuggestionList: React.FC = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const {
    data: suggestions,
    isLoading,
    isError,
  } = useQuery<Suggestion[]>({
    queryKey: ['adminSuggestions'],
    queryFn: getSuggestionsAPI,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSuggestionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSuggestions'] });
    },
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const handleDelete = useCallback(
    (id: number) => {
      if (window.confirm('이 건의사항을 삭제하시겠습니까?')) {
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation],
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2
          className="w-8 h-8 text-lounge-gold animate-spin mb-3"
        />
        <p className="text-lounge-text-secondary font-PretendardLight text-sm">
          건의사항을 불러오는 중...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
        <p className="text-red-400 font-PretendardRegular text-sm">
          건의사항을 불러오는 데 실패했습니다.
        </p>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Inbox className="w-10 h-10 text-lounge-text-muted mb-3" />
        <p className="text-lounge-text-muted font-PretendardLight text-sm">
          건의사항이 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="bg-lounge-card rounded-xl p-5 border border-lounge-border hover:border-lounge-gold/20 transition-colors duration-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-lounge-text font-PretendardRegular text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                {suggestion.content}
              </p>
              <p className="text-lounge-text-muted font-PretendardLight text-xs mt-3">
                {formatKoreanDate(suggestion.createdAt)}
              </p>
            </div>
            <button
              onClick={() => handleDelete(suggestion.id)}
              disabled={deleteMutation.isPending}
              className="flex-shrink-0 p-2 text-lounge-text-muted hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-red-400/10 disabled:opacity-40"
              aria-label="건의사항 삭제"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSuggestionList;
