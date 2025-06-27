// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import tailwindcss from '@tailwindcss/vite'
// // /** @type {import('tailwindcss').Config} */
// // https://vite.dev/config/
// export default defineConfig({
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}", // 👈 this line includes all your React files
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [react() ],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});
