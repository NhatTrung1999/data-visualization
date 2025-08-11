import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5174
  },
  plugins: [react(), tailwindcss(), svgr({
    svgrOptions: {
      icon: true,
      exportType: 'named',
      namedExport: 'ReactComponent'
    }
  })],
});
