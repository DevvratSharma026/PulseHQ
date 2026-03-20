/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050810',
        deep: '#080d1a',
        surface: '#0d1526',
        panel: '#111c32',
        border: '#1a2a45',
        muted: '#2a3f60',
        pulse: '#00e5a0',
        'pulse-dim': '#00b07a',
        'cyan-a': '#00c8ff',
        amber: '#f5a623',
        'red-a': '#ff4d6a',
        text: '#e2eaf7',
        'text-muted': '#6b82a8',
        'text-dim': '#3a506e',
      },
      fontFamily: {
        display: ['"DM Mono"', 'monospace'],
        body: ['"Syne"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}


