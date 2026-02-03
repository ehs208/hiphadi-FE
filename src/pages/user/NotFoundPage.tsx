import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-lounge-bg text-lounge-text flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 404 display */}
        <h1 className="text-8xl sm:text-9xl font-PretendardExtraBold text-lounge-gold tracking-widest leading-none">
          404
        </h1>

        {/* Decorative gold line */}
        <div className="w-16 h-0.5 bg-lounge-gold mx-auto mt-6 mb-6" />

        {/* Message */}
        <p className="text-base sm:text-lg font-PretendardLight text-lounge-text-secondary mb-10">
          페이지를 찾을 수 없습니다
        </p>

        {/* Back to menu button */}
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 bg-lounge-gold text-lounge-bg font-PretendardSemiBold rounded-lg hover:bg-lounge-gold-light transition-colors duration-300 text-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          메뉴로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
