import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          border: "#334155",
        },
        light: {
          bg: "#f8fafc",
          surface: "#ffffff",
          border: "#e2e8f0",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
