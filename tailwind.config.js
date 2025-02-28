/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cyberpunk Library Theme
        cyberpunk: {
          purple: '#A020F0',
          blue: '#00FFFF',
          pink: '#FF007F',
          black: '#0D0D0D',
        },
        // Retro Neon Theme
        retro: {
          magenta: '#FF33FF',
          cyan: '#00E5FF',
          lime: '#39FF14',
          gray: '#1A1A1A',
        },
        // Glow in the Dark Theme
        glow: {
          yellow: '#FFFF33',
          orange: '#FF7300',
          blue: '#00FFFF',
          black: '#121212',
        },
        // Base colors
        dark: {
          100: '#1A1A1A',
          200: '#151515',
          300: '#121212',
          400: '#0D0D0D',
          500: '#0A0A0A',
          600: '#070707',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        },
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          primary: '#A020F0',    // Neon Purple
          secondary: '#00FFFF',  // Electric Blue
          tertiary: '#FF007F',   // Hot Pink
          quaternary: '#39FF14', // Lime Green
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyberpunk-gradient': 'linear-gradient(to right, #A020F0, #00FFFF, #FF007F)',
        'retro-gradient': 'linear-gradient(to right, #FF33FF, #00E5FF, #39FF14)',
        'glow-gradient': 'linear-gradient(to right, #FFFF33, #FF7300, #00FFFF)',
      },
      animation: {
        'pulse': 'pulse 3s ease-in-out infinite',
        'hue-rotate': 'hue-rotate 10s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        'pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 }
        },
        'hue-rotate': {
          '0%, 100%': {
            filter: 'hue-rotate(0deg) brightness(1)',
          },
          '50%': {
            filter: 'hue-rotate(30deg) brightness(1.2)',
          }
        },
        'glow-pulse': {
          '0%, 100%': {
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
          },
          '50%': {
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor',
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary.400), 0 0 20px theme(colors.primary.500)',
        'neon-strong': '0 0 5px theme(colors.primary.400), 0 0 20px theme(colors.primary.500), 0 0 40px theme(colors.primary.600)',
        'neon-glow': '0 0 7px theme(colors.primary.300), 0 0 10px theme(colors.primary.400), 0 0 21px theme(colors.primary.500), 0 0 42px theme(colors.primary.600)',
        'neon-cyberpunk': '0 0 5px theme(colors.cyberpunk.purple), 0 0 20px theme(colors.cyberpunk.blue), 0 0 40px theme(colors.cyberpunk.pink)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} 