import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backgroundMain: 'rgb(16 57 87 / var(--tw-bg-opacity, 1))',
        borderMain: '#FFFFFF33',
        fontMain: 'rgb(229 231 235 / var(--tw-text-opacity, 1))',
      },
    },
  },
  plugins: [],
} satisfies Config;
