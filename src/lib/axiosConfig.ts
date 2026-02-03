import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';
const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_URL ?? '';

axios.defaults.baseURL = API_URL;

export const InstanceGuest = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 이미지 상대 경로를 절대 URL로 변환
 * - 로컬: /images/header/xxx.jpg -> http://localhost:8080/images/header/xxx.jpg
 * - 운영: /images/header/xxx.jpg -> /images/header/xxx.jpg (Nginx가 동일 도메인에서 서빙)
 */
export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}${path}`;
};
