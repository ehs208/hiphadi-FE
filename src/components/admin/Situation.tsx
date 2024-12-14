import { useMutation } from '@tanstack/react-query';
import { changeSituationAPI } from '@api/admin/adminAPI';

type SituationType = 'PARTY' | 'NORMAL';

export default function Situation() {
  const mutation = useMutation({
    mutationFn: changeSituationAPI,
    onSuccess: (data) => {
      console.log('상태 변경 성공:', data);
    },
    onError: (error) => {
      console.error('상태 변경 실패:', error);
    },
  });

  const handleSituationChange = (situation: SituationType) => {
    mutation.mutate(situation);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          상태 변경
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => handleSituationChange('PARTY')}
            disabled={mutation.isPending}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300 transition-colors"
          >
            PARTY
          </button>

          <button
            onClick={() => handleSituationChange('NORMAL')}
            disabled={mutation.isPending}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
          >
            NORMAL
          </button>
        </div>

        {mutation.isPending && (
          <div className="text-center text-gray-600">상태 변경 중...</div>
        )}

        {mutation.isSuccess && (
          <div className="text-center text-green-600">
            상태가 성공적으로 변경되었습니다.
          </div>
        )}

        {mutation.isError && (
          <div className="text-center text-red-600">
            상태 변경에 실패했습니다. 다시 시도해주세요.
          </div>
        )}
      </div>
    </div>
  );
}
