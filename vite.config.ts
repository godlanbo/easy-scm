import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Arco components auto import
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import prismjs from 'vite-plugin-prismjs'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ArcoResolver()],
    }),
    prismjs({
      languages: ['html', 'js'],
      plugins: ['line-numbers'],
      theme: 'okaidia',
      css: true,
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
      images: '/src/assets/images',
    },
  },
})
