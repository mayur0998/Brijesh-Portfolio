/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom font families
      fontFamily: {
        'playfair': ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        'inter': ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
        'segoe': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      
      // Custom colors for the portfolio theme
      colors: {
        'portfolio': {
          'bg': '#F2F1E0',
          'primary': '#000000',
          'secondary': '#ffffff',
          'accent': '#f5f5f5',
        },
        'purple': {
          '500': '#8B5CF6',
        }
      },
    },
  },
  plugins: [],
}
