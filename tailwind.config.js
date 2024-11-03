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
    },
  },
  plugins: [],
};
