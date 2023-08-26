/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				circular: ['CircularStd', 'sans'] // 'sans' is a fallback in case the font doesn't load
			}
		}
	},
	plugins: []
};
