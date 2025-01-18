import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'light-background': 'linear-gradient(94.27deg, rgba(182, 130, 28, 0.4) 34.58%, rgba(182, 130, 29, 0.4) 42.09%, rgba(184, 132, 31, 0.4) 48.21%, rgba(187, 135, 34, 0.4) 53.13%, rgba(191, 139, 38, 0.4) 57.09%, rgba(195, 144, 43, 0.4) 60.3%, rgba(200, 149, 49, 0.4) 62.97%, rgba(206, 155, 56, 0.4) 65.32%, rgba(212, 161, 63, 0.4) 67.55%, rgba(218, 168, 71, 0.4) 69.9%, rgba(225, 175, 78, 0.4) 72.57%, rgba(231, 182, 86, 0.4) 75.78%, rgba(238, 188, 93, 0.4) 79.74%, rgba(244, 195, 100, 0.4) 84.67%, rgba(250, 201, 107, 0.4) 90.78%, rgba(255, 207, 114, 0.4) 98.29%)'
  		},
  		spacing: {
  			'128': '32rem'
  		},
  		minWidth: {
  			'128': '32rem'
  		},
  		colors: {
  			'primary-gold': '#B6821C',
  			'unused-gray': '#BDBDBD'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
