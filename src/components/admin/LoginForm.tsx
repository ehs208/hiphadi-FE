import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { adminLoginAPI } from '@api/admin/adminAPI';
import { useNavigate, useLocation } from 'react-router-dom';

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => adminLoginAPI(data),
    onSuccess: (data) => {
      const redirectTo = location.state?.from?.pathname || '/admin/dashboard';
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {},
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-full font-PretendardRegular min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-PretendardExtraBold text-lounge-gold-light tracking-wide mb-2">
            힙하디
          </h1>
          <p className="text-sm text-lounge-text-secondary font-PretendardLight">
            관리자 로그인
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-lounge-card p-6 rounded-xl border border-lounge-border">
          <div className="space-y-2">
            <div className="text-sm font-PretendardBold text-lounge-text-secondary">아이디</div>
            <div className="relative">
              <input
                {...register('username')}
                className="w-full px-4 py-3 bg-lounge-surface border border-lounge-border rounded-lg text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200 placeholder:text-lounge-text-muted"
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-PretendardBold text-lounge-text-secondary">
              비밀번호
            </div>
            <div className="relative">
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-3 bg-lounge-surface border border-lounge-border rounded-lg text-lounge-text focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 focus:border-lounge-gold transition-all duration-200 placeholder:text-lounge-text-muted"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full px-4 py-3 text-lounge-bg font-PretendardBold bg-lounge-gold rounded-lg hover:bg-lounge-gold-dark focus:outline-none focus:ring-2 focus:ring-lounge-gold/50 disabled:bg-lounge-gold-dark/50 disabled:text-lounge-text-muted transition-all duration-200"
            >
              {loginMutation.isPending ? '로그인 중...' : '로그인'}
            </button>
          </div>

          {loginMutation.isError && (
            <div className="text-lounge-danger text-sm mt-2 font-PretendardMedium text-center">
              로그인에 실패했습니다. 다시 시도해주세요.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
