/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'off-white': {
					100: '#F5F5F4',
					200: '#E1E1E0',
					300: '#CECECC',
					400: '#B4B4B1'
				},
				'dove-gray': {
					100: '#80807F',
					200: '#6A6A69',
					300: '#5A5A59',
					400: '#4A4A49'
				},
				cyan: {
					1000: '#113f50',
					1100: '#0a2530'
				}
			}
		}
	},

	plugins: []
};
