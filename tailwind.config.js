/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6E8EC',
          100: '#C2C7D0',
          200: '#9AA3B3',
          300: '#717F95',
          400: '#526480',
          500: '#344A6A',
          600: '#2B3D57',
          700: '#233044',
          800: '#1A2331',
          900: '#0A1128',
        },
        secondary: {
          50: '#EAEEED',
          100: '#CBD5D1',
          200: '#AABB14',
          300: '#8AA297',
          400: '#6F8978',
          500: '#4A5E4C',
          600: '#3D4E3F',
          700: '#303D32',
          800: '#242D24',
          900: '#182319',
        },
        accent: {
          50: '#F9E6E6',
          100: '#F1C2C3',
          200: '#E8999B',
          300: '#DF7073',
          400: '#D34D51',
          500: '#9B2226',
          600: '#821D21',
          700: '#69171B',
          800: '#501215',
          900: '#370D0F',
        },
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}