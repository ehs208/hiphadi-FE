/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        PretendardBlack: ['Pretendard-Black'],
        PretendardExtraBold: ['Pretendard-ExtraBold'],
        PretendardBold: ['Pretendard-Bold'],
        PretendardSemiBold: ['Pretendard-SemiBold'],
        PretendardMedium: ['Pretendard-Medium'],
        PretendardRegular: ['Pretendard-Regular'],
        PretendardLight: ['Pretendard-Light'],
        PretendardExtraLight: ['Pretendard-ExtraLight'],
        PretendardThin: ['Pretendard-Thin'],
      },
      colors: {
        lounge: {
          bg: '#0D0D0D',
          surface: '#141414',
          card: '#1A1A1A',
          'card-hover': '#222222',
          border: '#2A2A2A',
          gold: '#C8956C',
          'gold-light': '#D4A574',
          'gold-dark': '#A87650',
          'gold-glow': '#D4A574',
          amber: '#B8860B',
          text: '#F5F0EB',
          'text-secondary': '#A89B8C',
          'text-muted': '#6B6360',
          'sold-out': '#5A4A42',
          danger: '#C0392B',
          'danger-hover': '#A93226',
          success: '#5D8A5E',
          'success-hover': '#4A7A4B',
        },
      },
      boxShadow: {
        'lounge': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'lounge-lg': '0 8px 40px rgba(0, 0, 0, 0.6)',
        'gold-glow': '0 0 20px rgba(200, 149, 108, 0.15)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.2s ease-out',
      },
      backgroundImage: {
        'lounge-gradient': 'linear-gradient(180deg, transparent 0%, #0D0D0D 100%)',
        'lounge-card-gradient': 'linear-gradient(180deg, #1E1E1E 0%, #1A1A1A 100%)',
      },
    },
  },
  plugins: [],
};
