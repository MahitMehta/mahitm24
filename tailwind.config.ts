import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontSize: {
			base: "20px",
			xl: "24px",
			"2xl": "28px",
			"3xl": "32px",
		},
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"brand-blue": "#22333B",
				"brand-blue-accent": "#121D23",
				"brand-blue-darker": "#0E1417",
				"brand-yellow": "#FFE99F",
				"brand-brown": "#2B1E1D",
				"brand-brown-darker": "#1C1413",
			},
		},
	},
	plugins: [],
};
export default config;
