import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Arco components auto import
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ArcoResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      views: '/src/views',
      store: '/src/store',
      utils: '/src/utils',
      comp: '/src/components',
      layout: '/src/layout',
    },
  },
})
