import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkLoginAPI } from '@api/admin/adminAPI';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/admin/login',
  children,
}) => {
  const location = useLocation();

  const {
    data: checkLoginData,
    error,
    isLoading,
  } = useQuery<boolean>({
    queryKey: ['Auth'],
    queryFn: checkLoginAPI,
    refetchOnMount: 'always',
    retry: false, // 인증 실패시 재시도하지 않음
    staleTime: 30 * 1000, // 30초 동안 캐시 유지
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-lounge-bg">
        <span className="text-lounge-text-secondary text-lg font-PretendardMedium">
          Loading...
        </span>
      </div>
    );
  }

  if (error) {
    // 에러가 발생하면 로그인 페이지로 리다이렉트
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (!checkLoginData) {
    // 현재 경로를 state로 전달하여 로그인 후 돌아올 수 있도록 함
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // children이 있으면 children을, 없으면 Outlet을 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
