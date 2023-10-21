import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-mind': 'linear-gradient(71deg, rgb(11 7 236 / 11%) 11%, rgb(0 109 255 / 17%) 17%, rgb(133 36 241 / 13%) 59%, rgb(70 108 229 / 19%) 113%)',
      },
      colors: {
        nn: {
          DEFAULT: 'hsl(262, 47%, 55%)',
          '100': 'hsl(262, 47%, 90%)',
          '200': 'hsl(262, 47%, 80%)',
          '300': 'hsl(262, 47%, 70%)',
          '400': 'hsl(262, 47%, 60%)',
          '500': 'hsl(262, 47%, 50%)',
          '600': 'hsl(262, 47%, 40%)',
          '700': 'hsl(262, 47%, 30%)',
          '800': 'hsl(262, 47%, 20%)',
          '900': 'hsl(262, 47%, 10%)',
        }
      },
    },
  },
  plugins: [],
}
export default config
