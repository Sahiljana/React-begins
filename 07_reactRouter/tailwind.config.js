/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // ✅ for vite
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ for all React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
