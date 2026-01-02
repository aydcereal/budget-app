import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",

        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",

        "primary-accent": "var(--color-primary-accent)",
        highlight: "var(--color-highlight)",

        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      fontFamily: {
        main: ["var(--font-main)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        custom: "var(--shadow-custom)",
      },
    },
  },
  plugins: [],
};

export default config;
