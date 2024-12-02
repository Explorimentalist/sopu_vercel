import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-noto)'],
  			serif: ['var(--font-inknut)']
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))'
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
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)',
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)',
  				},
  			},
  			'fade-out-down': {
  				'0%': {
  					opacity: '1',
  					transform: 'translateY(0)',
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'translateY(20px)',
  				},
  			},
  			'slide-in-right': {
  				'0%': {
  					transform: 'translateX(100%)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			'slide-out-left': {
  				'0%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				},
  				'100%': {
  					transform: 'translateX(-100%)',
  					opacity: '0'
  				}
  			},
  			'scale-up': {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in-up': 'fade-in-up 0.3s ease-out',
  			'fade-out-down': 'fade-out-down 0.3s ease-out',
  			'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.14, 0, 0.07, 1)',
  			'slide-out-left': 'slide-out-left 0.3s cubic-bezier(0.14, 0, 0.07, 1)',
  			'scale-up': 'scale-up 0.3s cubic-bezier(0.14, 0, 0.07, 1)',
  		},
  		transitionTimingFunction: {
  			'smooth-out': 'cubic-bezier(0.14, 0, 0.07, 1)',
  		},
  		transitionDuration: {
  			'300': '300ms',
  		},
  	}
  },
  plugins: [],
};
export default config;
