/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      colors: {
        void: '#020408',
        cosmic: {
          500: '#6366f1', // Purple cosmic
        },
        neon: {
          cyan: '#06b6d4',
          amber: '#f59e0b',
          purple: '#6366f1',
        },
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(ellipse at center, #020408 0%, #000000 100%)',
        'glass-panel': 'rgba(255, 255, 255, 0.03)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'neon-purple': '0 0 20px rgba(99, 102, 241, 0.5)',
        'neon-amber': '0 0 20px rgba(245, 158, 11, 0.5)',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};
