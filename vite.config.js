import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  // Para GitHub Pages: usa el nombre del repositorio como base
  // Para desarrollo local: usa '/'
  base: process.env.NODE_ENV === 'production' ? '/e-commerce/' : '/',
})
