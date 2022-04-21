import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import './style/index.scss'
import '@arco-design/web-vue/es/message/style/css.js'
// import ArcoVueIcon from '@arco-design/web-vue/es/icon'

createApp(App).use(router).use(createPinia()).mount('#app')
