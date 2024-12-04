// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'fp-blue': '#004B87',      // Fisher & Paykel primary blue
        'fp-light-blue': '#E6F3FF', // Light blue for hover states
        'fp-gray': '#F5F5F5',      // Light gray for backgrounds
        'fp-dark': '#333333',      // Dark gray for text
      },
      fontFamily: {
        'sans': ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        'fp': '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
