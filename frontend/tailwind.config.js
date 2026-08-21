/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          navy: '#0F172A',
          green: '#15803D',
          emerald: '#10B981',
          teal: '#0F766E',
          warning: '#F59E0B',
          critical: '#EF4444',
          light: '#F8FAFC',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
