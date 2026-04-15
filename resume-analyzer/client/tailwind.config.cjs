/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				resumex: {
					bg: '#0A0A0A',
					card: '#111111',
					muted: '#A3A3A3',
					border: '#262626',
					accent: '#D4AF37',
				},
			},
			boxShadow: {
				'soft-xl': '0 32px 80px rgba(0, 0, 0, 0.85)',
			},
		},
	},
	plugins: [],
};
