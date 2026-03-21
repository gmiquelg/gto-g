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
          100: "var(--brand-100)",
          200: "var(--brand-200)",
        },
        neutral: {
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
        },
        danger: {
          100: "var(--danger-100)",
          200: "var(--danger-200)",
        },
        card: {
          spade: "var(--card-spade)",
          heart: "var(--card-heart)",
          diamond: "var(--card-diamond)",
          club: "var(--card-club)",
        }
      }
    },
  },
  plugins: [],
}
