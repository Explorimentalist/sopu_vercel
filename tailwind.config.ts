import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-noto)'],
  			serif: ['var(--font-inknut)'],
  		},
  		colors: {
  			border: "hsl(var(--border))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  		}
  	}
  },
  plugins: [],
};
export default config;
