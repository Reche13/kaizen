import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        primary: {
          300: "#4DA6FF",
          400: "#1B87F3",
          500: "#0080FF",
          600: "#0074E8",
        },
        surface: {
          primary: "#FFFFFF",
          seconday: "#EAEAEA",
          tertiary: "#F5F5F5",
          accent: "#EAF2FF",
        },
        gray: {
          500: "#C5C5C5",
          600: "#828282",
          700: "#565656",
          900: "#0C0C0C",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
