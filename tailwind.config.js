/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ['Tahoma', 'Calibri', 'Helvetica', 'Arial', 'Verdana'],
      heading: ['Arvo', '"Museo Slab"', 'Rockwell'],
    },
    colors: {
      text: {
        light: {
          100: '#496e6e',
          200: '#3d5b5b',
          300: '#314949',
          400: '#253737',
          500: '#0c1212',
        },
        dark: {
          500: '#edf3f3',
          600: '#c8dada',
          700: '#b6cece',
          800: '#a4c2c2',
          900: '#91b6b6',
        },
      },
      background: {
        light: {
          500: '#f6f9f9',
          600: '#d1e1e1',
          700: '#bfd4d4',
          800: '#adc8c8',
          900: '#9abcbc',
        },
        dark: {
          100: '#436565',
          200: '#375252',
          300: '#2b4040',
          400: '#1e2e2e',
          500: '#060909',
        },
      },
      primary: {
        light: {
          100: '#c5d5d8',
          200: '#b3c8cb',
          300: '#a1bbbf',
          400: '#8fadb3',
          500: '#6a939a',
          600: '#507177',
          700: '#445f64',
          800: '#384e52',
          900: '#2b3d40',
        },
        dark: {
          100: '#bfd1d4',
          200: '#adc3c7',
          300: '#9bb6bb',
          400: '#88a9af',
          500: '#658e95',
          600: '#4c6b70',
          700: '#405a5e',
          800: '#34484c',
          900: '#27373a',
        },
      },
      secondary: {
        light: {
          200: '#f9f9fb',
          300: '#e6e7ee',
          400: '#d4d5e2',
          500: '#b0b2c9',
          600: '#8c8fb0',
          700: '#797da4',
          800: '#676b97',
          900: '#5b5e85',
        },
        dark: {
          100: '#7a7ea4',
          200: '#686c98',
          300: '#5b5f86',
          400: '#4f5273',
          500: '#36384f',
          600: '#1d1e2b',
          700: '#111119',
          800: '#040506',
        },
      },
      accent: {
        light: {
          100: '#e5e4ec',
          200: '#d4d2df',
          300: '#c3c0d3',
          400: '#b2aec6',
          500: '#908aad',
          600: '#6e6793',
          700: '#615a81',
          800: '#534e6f',
          900: '#46415d',
        },
        dark: {
          100: '#a7a2be',
          200: '#9690b1',
          300: '#847ea5',
          400: '#736c98',
          500: '#585275',
          600: '#3d3951',
          700: '#2f2c3f',
          800: '#22202d',
          900: '#14131b',
        },
      },
    },
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}