import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			spacing: {
				// 32px = 2rem
				'0': '0rem',
				'1': '0.125rem', // 2px
				'2': '0.25rem', // 4px
				'4': '0.5rem', // 8px
				'8': '1rem', // 16px
				'16': '2rem', // 32px
				'24': '3rem', // 48px
				'32': '4rem' // 64px
			},
			borderRadius: {
				DEFAULT: '0.5rem'
			},
			fontSize: {
				xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
				sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
				base: ['1rem', { lineHeight: '1.5rem' }], // 16px
				md: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
				lg: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
				xl: ['1.375rem', { lineHeight: '1.75rem' }] // 24px
			}
		}
		// extend: {
		// 	colors: {
		// 		'silver': {
		// 			'50': '#fcfdfd',
		// 			'100': '#f7f8f7',
		// 			'200': '#eef0ef',
		// 			'300': '#e1e3e2',
		// 			'400': '#d1d4d2',
		// 			'500': '#b4b9b7',
		// 			'600': '#a1a6a4',
		// 			'700': '#858988',
		// 			'800': '#6c706e',
		// 			'900': '#4f5351',
		// 			'950': '#363938',
		// 		},
		// 		'lavender': {
		// 			'50': '#fffaff',
		// 			'100': '#f9f4ff',
		// 			'200': '#f3eaff',
		// 			'300': '#e8daff',
		// 			'400': '#d8cafb',
		// 			'500': '#c1a5fd',
		// 			'600': '#af93e9',
		// 			'700': '#9177c7',
		// 			'800': '#7760a5',
		// 			'900': '#59457f',
		// 			'950': '#3f2b62',
		// 		}
		// 	}
	},

	plugins: []
}
