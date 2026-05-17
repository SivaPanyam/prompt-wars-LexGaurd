/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#faf8ff',
          dim: '#d2d9f4',
          bright: '#faf8ff',
          variant: '#dae2fd',
          tint: '#544fc0',
        },
        'surface-container': {
          lowest: '#ffffff',
          low: '#f2f3ff',
          DEFAULT: '#eaedff',
          high: '#e2e7ff',
          highest: '#dae2fd',
        },
        'on-surface': {
          DEFAULT: '#131b2e',
          variant: '#464553',
        },
        'inverse-surface': '#283044',
        'inverse-on-surface': '#eef0ff',
        outline: {
          DEFAULT: '#777584',
          variant: '#c8c4d5',
        },
        primary: {
          DEFAULT: '#1f108e',
          container: '#3730a3',
          fixed: '#e2dfff',
          'fixed-dim': '#c3c0ff',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#a9a7ff',
          fixed: '#0f0069',
          'fixed-variant': '#3b35a7',
        },
        'inverse-primary': '#c3c0ff',
        secondary: {
          DEFAULT: '#505f76',
          container: '#d0e1fb',
          fixed: '#d3e4fe',
          'fixed-dim': '#b7c8e1',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#54647a',
          fixed: '#0b1c30',
          'fixed-variant': '#38485d',
        },
        tertiary: {
          DEFAULT: '#511c00',
          container: '#752c00',
          fixed: '#ffdbcc',
          'fixed-dim': '#ffb694',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#fe9562',
          fixed: '#351000',
          'fixed-variant': '#7a3003',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
        background: '#faf8ff',
        'on-background': '#131b2e',
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
