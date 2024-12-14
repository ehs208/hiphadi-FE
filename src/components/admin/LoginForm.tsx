import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { adminLoginAPI } from '@api/admin/adminAPI';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => adminLoginAPI(data),
    onSuccess: (data) => {
      navigate('/admin/dashboard');
    },
    onError: (error) => {
      // 에러 처리
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-md font-PretendardRegular min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm  text-white">아이디</div>
          <div className="relative">
            <input
              {...register('username')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="아이디를 입력하세요"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm  text-white ">비밀번호</div>
          <div className="relative">
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
        </div>

        {loginMutation.isError && (
          <div className="text-red-500 text-sm mt-2">
            로그인에 실패했습니다. 다시 시도해주세요.
          </div>
        )}
      </form>
    </div>
  );
}
