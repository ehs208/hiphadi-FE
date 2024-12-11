import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full text-gray-300 mt-auto py-3">
      <div className="max-w-6xl mx-auto px-4 font-PretendardExtraLight">
        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/privacypolicy"
            className="text-sm  hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            개인정보 처리 방침
          </Link>
          <div className="text-sm text-gray-400">
            © 2024 힙하디. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
