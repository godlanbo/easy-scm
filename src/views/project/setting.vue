<script setup lang="ts">
import { useProjectStore } from '../../store'
import { dateTransformer } from '../../utils'
import RoomCard from '../../components/RoomCard.vue'
import UploadImage from '../../components/UploadImage.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
const projectStore = useProjectStore()
const currentProjectInfo = projectStore.currentProjectInfo

const route = useRoute()
const router = useRouter()
// const settingNav = ['General', 'Build']

let currentSettingNav = ref<string>(route.params.settingNav as string)

function handleSettingNavClick(key: string) {
  router.push({
    params: {
      settingNav: key,
    },
  })
}
</script>
<template>
  <div class="project-setting">
    <div class="layout-row">
      <RoomCard
        class="max-w-2xl"
        only-show
        :title="currentProjectInfo?.name"
        min-height="200"
      >
        <template #content>
          <div class="project-info flex">
            <div class="project-info-base flex flex-col flex-grow">
              <div class="desc text-black-default text-xl mb-4">
                {{ currentProjectInfo?.desc }}
              </div>
              <div class="create-info text-base text-gray-500 mb-4">
                <span>导入自</span
                ><a
                  class="text-gray-500 hover:text-black-default"
                  :href="currentProjectInfo?.repoUrl"
                  >Github</a
                >
                ,
                <span>创建于：</span>
                <span>{{
                  dateTransformer(currentProjectInfo?.createDate)
                }}</span>
              </div>
              <div class="build-info text-base text-gray-500 mb-4">
                <span>当前版本：</span>
                <span>V{{ currentProjectInfo?.version }}</span>
                ,
                <span>最后更新时间：</span>
                <span>{{
                  dateTransformer(currentProjectInfo?.updateDate)
                }}</span>
              </div>
            </div>
            <div class="project-info-cover">
              <UploadImage class="w-56 h-40"></UploadImage>
            </div>
          </div>
        </template>
      </RoomCard>
    </div>
    <div class="project-setting-content flex">
      <div class="sidebar basis-1/6 mt-6 mr-4">
        <a-menu
          mode="pop"
          class="border rounded-lg border-border-gray border-solid shadow-card"
          :default-selected-keys="[currentSettingNav]"
          @menu-item-click="handleSettingNavClick"
        >
          <a-menu-item key="general">General</a-menu-item>
          <a-menu-item key="build">Build</a-menu-item>
        </a-menu>
      </div>
      <div class="main-content flex-grow">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-row {
  display: flex;
}
</style>
