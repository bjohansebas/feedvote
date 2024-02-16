import sharedConfig from '@feedvote/config/tailwind/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}',
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        scooter: {
          DEFAULT: '#039ab7',
          '50': '#ebffff',
          '100': '#cefdff',
          '200': '#a2f8ff',
          '300': '#63f0fd',
          '400': '#1cdef4',
          '500': '#00bcd4',
          '600': '#039ab7',
          '700': '#0a7a94',
          '800': '#126278',
          '900': '#145265',
          '950': '#063646',
        },
      },
    },
  },
}

export default config
