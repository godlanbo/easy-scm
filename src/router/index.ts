import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import VueRouter from 'vue-router'

const HelloWorld = () => import('../components/HelloWorld.vue')
export const roomTabRouters: RouteRecordRaw[] = [
  {
    path: 'overview',
    component: () => import('views/room/overview.vue'),
    name: 'Overview',
    meta: {
      tabName: 'Overview',
      to: 'Overview',
      showRoom: true,
    },
  },
  {
    path: 'members',
    component: () => import('views/room/members.vue'),
    name: 'Members',
    meta: {
      tabName: 'Members',
      to: 'Members',
      showRoom: true,
    },
  },
  {
    path: 'projects',
    component: () => import('views/room/projects.vue'),
    name: 'Projects',
    meta: {
      tabName: 'Projects',
      to: 'Projects',
      showRoom: true,
    },
  },
]

export const projectTabRouters: RouteRecordRaw[] = [
  {
    path: 'overview',
    component: () => import('views/project/overview.vue'),
    name: 'ProjectOverview',
    meta: {
      tabName: 'Overview',
      to: 'ProjectOverview',
      showRoom: true,
      showProject: true,
    },
  },
  {
    path: 'setting',
    component: () => import('views/project/setting.vue'),
    redirect: {
      name: 'ProjectSettingIndex',
      params: {
        settingNav: 'general',
      },
    },
    name: 'ProjectSetting',
    meta: {
      // hidden: true,
      to: 'ProjectSetting',
      tabName: 'Setting',
      showProject: true,
    },
    children: [
      {
        path: ':settingNav',
        component: () => import('views/project/setting/index.vue'),
        name: 'ProjectSettingIndex',
      },
    ],
  },
]

export const projectBuildTabRoutes: RouteRecordRaw[] = [
  {
    path: 'build/:buildId',
    component: () => import('views/project/build.vue'),
    name: 'ProjectBuild',
    meta: {
      tabName: '< Overview',
      to: 'ProjectOverview',
      showRoom: true,
      showProject: true,
    },
  },
]
// const Base = () => import('views/index.vue')
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/start',
    },
    {
      path: '/start',
      name: 'Start',
      component: () => import('views/start.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('views/login.vue'),
    },
    {
      path: '/explore',
      component: () => import('layout/base/index.vue'),
      redirect: '/explore/room',
      children: [
        {
          path: ':type',
          name: 'Explore',
          component: () => import('views/explore.vue'),
        },
      ],
    },
    {
      path: '/create',
      component: () => import('layout/base/index.vue'),
      name: 'Create',
      redirect: {
        name: 'CreateRepo',
      },
      children: [
        {
          path: 'repo',
          component: () => import('views/project/create.vue'),
          name: 'CreateRepo',
          meta: {
            showRoom: true,
          },
        },
        {
          path: 'room',
          component: () => import('views/room/create.vue'),
          name: 'CreateRoom',
        },
      ],
    },
    {
      path: '/rooms',
      component: () => import('layout/base/index.vue'),
      name: 'Room',
      children: [
        {
          path: ':owner',
          component: () => import('layout/base/navbar.vue'),
          redirect: {
            name: 'Overview',
          },
          children: [...roomTabRouters],
        },
      ],
    },
    {
      path: '/projects',
      component: () => import('layout/base/index.vue'),
      name: 'Project',
      children: [
        {
          path: ':projectId',
          component: () => import('layout/base/navbar.vue'),
          redirect: {
            name: 'ProjectOverview',
          },
          children: [...projectTabRouters, ...projectBuildTabRoutes],
        },
      ],
    },
  ],
})

// router.addRoute()

export default router
