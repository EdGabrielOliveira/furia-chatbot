import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px", // Extra small screens and up
        sm: "520px", // Small screens and up
        md: "920px", // Medium screens and up
        lg: "1280px", // Large screens and up
        xl: "1920px", // Extra large screens and up
        "2xl": "1536px", // 2x extra large screens and up
      },
    },
  },
  plugins: [],
};

export default config;
