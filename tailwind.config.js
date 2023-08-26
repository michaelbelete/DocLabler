/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#800020',
				secondary: '#FAAA52',
				accent: '#F7F7FB',
				dark: '#19191B'
			},
			fontFamily: {
				circular: ['CircularStd', 'sans'] // 'sans' is a fallback in case the font doesn't load
			}
		}
	},
	plugins: []
};
