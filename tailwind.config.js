/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0B0B0C',
        bgSecondary: '#141416',
        textPrimary: '#F5F5F7',
        textSecondary: '#8E8E93',
        accentPrimary: '#FF5E00', // Film burn orange
        accentSecondary: '#DFFF00', // Acid green
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
