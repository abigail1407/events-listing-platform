/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
  './src/**/*.{js, jsx, ts, tsx, mdx}',
  '../../node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  './node_modules/tailwind-datepicker-react/dist/**/*.js'
];
export const theme = {
  extend: {},
};
export const plugins = [];