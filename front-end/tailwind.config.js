export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00172f", // Your deep navy brand color
        accent: "#3b82f6",  // Modern Blue for highlights
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
};