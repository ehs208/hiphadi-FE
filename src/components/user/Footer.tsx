import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full text-lounge-text-secondary mt-auto py-4 border-t border-lounge-border/50">
      <div className="max-w-6xl mx-auto px-4 font-PretendardExtraLight">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex items-center space-x-2">
            <Link
              to="/privacypolicy"
              className="text-sm text-lounge-text-secondary hover:text-lounge-gold rounded-lg transition-colors duration-200 py-1 px-2"
            >
              개인정보 처리 방침
            </Link>
          </div>
          <div className="text-sm text-lounge-text-muted">
            &copy; 2026 힙하디. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
