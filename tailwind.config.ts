import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1600px'
  		}
  	},
  	extend: {
  		maxWidth: {
  			'md': '36rem',
  			'4xl': '64rem',
  		},
  		fontSize: {
  			'xs': ['0.9375rem', { lineHeight: '1.5' }],    // 15px
  			'sm': ['1.0625rem', { lineHeight: '1.5' }],    // 17px
  			'base': ['1.1875rem', { lineHeight: '1.5' }],  // 19px
  			'lg': ['1.3125rem', { lineHeight: '1.5' }],    // 21px
  			'xl': ['1.5rem', { lineHeight: '1.5' }],       // 24px
  			'2xl': ['1.875rem', { lineHeight: '1.5' }],    // 30px
  			'3xl': ['2.25rem', { lineHeight: '1.5' }],     // 36px
  			'4xl': ['3rem', { lineHeight: '1.5' }],        // 48px
  			'5xl': ['3.75rem', { lineHeight: '1.5' }],     // 60px
  			'6xl': ['4.5rem', { lineHeight: '1.5' }],      // 72px
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					maxWidth: '100%',
  					color: null,
  					p: {
  						marginTop: '0',
  						marginBottom: '0.75em',
  					},
  					'ul, ol': {
  						marginTop: '0',
  						marginBottom: '0.75em',
  					},
  					li: {
  						marginTop: '0',
  						marginBottom: '0.25em',
  					},
  					'code::before': {
  						content: '""',
  					},
  					'code::after': {
  						content: '""',
  					},
  				},
  			},
  		},
  		fontFamily: {
  			sans: ["var(--font-sans)", ...fontFamily.sans],
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config 