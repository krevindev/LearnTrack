import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
