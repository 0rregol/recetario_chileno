import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'clay-red': '#B94E48',
        'soft-cream': '#F9FAFB',
        'dark-slate': '#1F2937',
      },
    },
  },
  plugins: [],
};
export default config;