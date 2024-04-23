/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{?s,?sx}',
    './src/App.{?s,?sx}',
    './src/components/**/*.{?s,?sx}',
    './src/screens/**/*.{?s,?sx}',
  ],
  theme: {
    extend: {
      colors: {
        midblue: {
          DEFAULT: '#5BBCB4',
          50: '#EEFDF4',
          100: '#DEFBED',
          200: '#C9F3E3',
          300: '#B5E8D9',
          400: '#70BAB3',
          500: '#5BBCB4',
          600: '#31767D',
          700: '#1D5A68',
          800: '#115e59',
          900: '#042f2e',
        },
        full: {
          DEFAULT: '#28282A',
          50: '#404042',
        },
        gray: {
          DEFAULT: '#D2D2D2',
          50: '#FAFAFA',
          100: '#E1E1E1',
        },
        secondary: {
          DEFAULT: '#152649',
        },
        tertiary: {
          DEFAULT: '#F5FAFE',
        },
        error: {
          DEFAULT: '#FF4A4A',
          50: '#FFE6E6',
          100: '#FF6464',
          500: '#FF1F1F',
        },
        light: {
          DEFAULT: '#D2D2D2',
          50: '#FFFFFF',
          300: '#FAFAFA',
          400: '#F3F3F3',
          500: '#E8E8E8',
        },
        success: {
          DEFAULT: '#10b981',
          100: '#C5F4E6',
        },
        warning: {
          DEFAULT: '#FFD43E',
          100: '#FFF6BF',
        },
        dark: {
          DEFAULT: '#404042',
          700: '#8B8B8B',
        },
        text: {
          active: {
            DEFAULT: '#5BBCB4',
          },
          info: {
            DEFAULT: '#1057EA',
          },
          caution: {
            DEFAULT: '#F05A28',
          },
          error: {
            DEFAULT: '#D70808',
          },
          positive: {
            DEFAULT: '#087C1C',
          },
          new: {
            DEFAULT: '#762CC7',
          },
          neutral: {
            DEFAULT: '#333333',
          },
        },
        bg: {
          info: {
            DEFAULT: '#DEF1FF',
          },
          caution: {
            DEFAULT: '#FFF2E2',
          },
          error: {
            DEFAULT: '#FFEDED',
          },
          positive: {
            DEFAULT: '#E2FBE8',
          },
          new: {
            DEFAULT: '#F2E9FC',
          },
          neutral: {
            DEFAULT: '#EDEDED',
          },
        },
      },
    },
  },
  plugins: [],
}
