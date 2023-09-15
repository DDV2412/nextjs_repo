import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans" : ["GeneralSans", "sans-serif"]
      }
    },
    container: {
      center: true,
      padding: '1rem',

      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1370px',
      },
    }
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
}
export default config
