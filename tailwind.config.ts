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
        brandNavy: "#0C356A",
        brandNavyDark: "#082142",
        brandOrange: "#C86218",
        brandOrangeHover: "#A74D0E",
        brandGold: "#EAA824",
        brandGoldHover: "#D49317",
        // Theme Aliases
        hpRed: "#C86218",
        hpRedHover: "#A74D0E",
        hpNavy: "#0C356A",
        hpDarkBlue: "#082142",
        hpLightGrey: "#f4f6f9",
      },
    },
  },
  plugins: [],
};
export default config;
