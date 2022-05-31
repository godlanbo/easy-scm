<script setup lang="ts">
import { IconEdit } from '@arco-design/web-vue/es/icon'
import { computed } from '@vue/reactivity'
import { ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  useOwnerStore,
  useProjectStore,
  useRoomStore,
  useUserStore,
} from '../../store'
import { useRouteJudge } from '../../utils'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const roomStore = useRoomStore()

watchEffect(async () => {
  await roomStore.checkRoomExist()
})

function handleBackStart() {
  router.push({
    name: 'Start',
  })
}
function handleUserInfoEdit() {
  console.log('edit user info')
}
const { isInRoom, isInProject } = useRouteJudge()

const ownerStore = useOwnerStore()
const projectStore = useProjectStore()

function handleBackToRoom() {
  router.push({
    name: 'Overview',
    params: {
      owner: ownerStore.currentOwner,
    },
  })
}

function handleBackToProject(projectId) {
  router.push({
    name: 'ProjectOverview',
    params: {
      projectId,
    },
  })
}

watch(route, (val, preVal) => {
  console.log('name:', val.name, preVal.name)
  console.log(val.name, preVal.path)
})
</script>
<template>
  <div class="root-container">
    <header class="app-header py-8 flex justify-between items-center">
      <div class="navbar flex items-center flex-grow">
        <div
          class="logo-wrapper mr-4 cursor-pointer text-theme-primary"
          @click="handleBackStart"
        >
          <i class="icon-fire"></i>
        </div>
        <div
          v-if="route.meta.showRoom"
          class="flex items-center btn-standard font-semibold text-xl text-black-default"
          @click="handleBackToRoom"
        >
          <span>{{ ownerStore.currentOwner }}</span>
          <span class="mr-1">的空间</span>
          <div
            v-if="route.meta.showProject"
            class="mt-[1px] font-extrabold text-base"
          >
            <i class="icon-arrow-right"></i>
          </div>
        </div>
        <div
          v-if="route.meta.showProject"
          class="project-name text-xl text-black-default font-semibold underline btn-standard"
          @click="handleBackToProject(projectStore.currentProjectInfo?.id)"
        >
          <span>{{ projectStore.currentProjectInfo?.name }}</span>
        </div>
      </div>
      <div class="detail-wrapper flex items-center">
        <a-popover
          title="消息中心"
          position="bottom"
          trigger="click"
          :content-style="{
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'auto',
          }"
        >
          <div class="message-btn-wrapper btn-standard text-gray-400 mr-8">
            <i class="icon-info"></i>
          </div>
          <template #content>
            <a-list size="large">
              <a-list-item>Beijing Bytedance Technology Co., Ltd.</a-list-item>
              <a-list-item>Bytedance Technology Co., Ltd.</a-list-item>
              <a-list-item>Beijing Toutiao Technology Co., Ltd.</a-list-item>
              <a-list-item>Beijing Volcengine Technology Co., Ltd.</a-list-item>
              <a-list-item
                >China Beijing Bytedance Technology Co., Ltd.</a-list-item
              >
            </a-list>
          </template>
        </a-popover>

        <div class="avatar-wrapper">
          <a-avatar trigger-type="mask" :size="40" @click="handleUserInfoEdit">
            <img alt="avatar" :src="userStore.userInfo?.avatar" />
            <template #trigger-icon>
              <IconEdit />
            </template>
          </a-avatar>
        </div>
      </div>
    </header>
    <main class="app-main mb-4">
      <router-view></router-view>
    </main>
    <footer
      class="flex justify-center py-8 border-border-gray border-t border-solid text-xl text-theme-primary"
    >
      Power by Godlanbo
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.root-container {
  padding-left: 8%;
  padding-right: 8%;
  .app-header {
    .logo-wrapper {
      font-size: 55px;
    }
    .detail-wrapper {
      .message-btn-wrapper {
        font-size: 24px;
      }
    }
  }
  .app-main {
  }
}
</style>
