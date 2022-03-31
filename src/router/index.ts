import { createRouter, createWebHistory } from 'vue-router'
// import VueRouter from 'vue-router'

const HelloWorld = () => import('../components/HelloWorld.vue')
const Base = () => import('../views/index.vue')
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    // {
    //   path: '/',
    //   component: Base,
    // },
    {
      path: '/hell',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
})

export default router
