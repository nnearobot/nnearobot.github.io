import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'text-xs',
    'text-sm',
    'text-base',
    'text-md',
    'text-lg',
    'text-xl',
  ],
  theme: {
    fontSize: {
      'xs': '0.7rem',
      'sm': '0.85rem',
      'base': '1rem',
      'md': '1.15rem',
      'lg': '1.25rem',
      'xl': '1.5rem',
      '2xl': '2rem',
      '3xl': '3rem',
      '4xl': '4rem',
      '5xl': '5rem',
    },
    extend: {
    },
  },
  plugins: [],
}

export default config
