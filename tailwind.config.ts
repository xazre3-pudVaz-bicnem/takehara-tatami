import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tatami: {
          50: '#F2F7EE',
          100: '#E0EDD6',
          200: '#C4D9AC',
          300: '#A4C480',
          400: '#88B462', // main light tatami green
          500: '#6E9A4C',
          600: '#577C3C',
          700: '#42602E',
          800: '#2E4620',
          900: '#1C2E14',
        },
        cream: '#F8F5EC',
        ecru: '#EDE8D9',
        parchment: '#E4DCC8',
        wood: {
          light: '#D8C4A4',
          DEFAULT: '#C4A882',
          dark: '#8B6347',
        },
        ink: '#2C2A28',
        muted: '#6B6660',
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'serif'],
        sans: ['var(--font-noto-sans)', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2.5s linear infinite',
        'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
        'line-grow': 'lineGrow 1s ease-out forwards',
        'float-up': 'floatUp 0.7s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-150%) skewX(-12deg)' },
          '100%': { transform: 'translateX(250%) skewX(-12deg)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.07)' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
