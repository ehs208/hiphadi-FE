import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { checkLoginAPI } from '@api/admin/adminAPI';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginCheck: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: checkLoginData, isLoading } = useQuery({
    queryKey: ['Auth'],
    queryFn: checkLoginAPI,
    refetchOnMount: 'always',
    retry: false,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (!isLoading && checkLoginData) {
      const redirectTo = location.state?.from?.pathname || '/admin/dashboard';
      navigate(redirectTo, { replace: true });
    }
  }, [checkLoginData, isLoading, navigate, location.state]);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다
  return null;
};

export default LoginCheck;
