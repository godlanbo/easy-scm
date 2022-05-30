<script setup lang="ts">
import { useRoute } from 'vue-router'
import RoomCard from '../../components/RoomCard.vue'
import { useProjectStore, useBuildStore } from '../../store'
import BuildStatusTag from '../../components/BuildStatusTag.vue'
import { dateTransformer } from '../../utils'
import { IconArrowDown, IconArrowUp } from '@arco-design/web-vue/es/icon'
import { ref, watch, watchEffect } from 'vue'
import { getBuildInfo } from '../../api'
import { useWebSocket, useDebounce } from '@vueuse/core'

// const projectStore = useProjectStore()
const route = useRoute()
const logContent = ref<HTMLDivElement>()
// const currentProjectInfo = projectStore.currentProjectInfo
// const buildStore = useBuildStore()
const currentBuildData = ref<BuildInfo>()

watchEffect(async () => {
  const rawBuildInfoRes = await getBuildInfo(route.params.buildId)
  currentBuildData.value = rawBuildInfoRes.data
})

const { data, status } = useWebSocket(
  `ws://127.0.0.1:3001/${route.params.buildId}`,
)
const buffer = ref('')
let timer = 0
watch(
  data,
  (val, preVal) => {
    console.log(val, preVal)
    buffer.value += val ? val : ''
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      if (logContent.value) {
        logContent.value.innerText += buffer.value
        buffer.value = ''
        timer = 0
      }
    }, 150)
  },
  {
    immediate: true,
  },
)
</script>
<template>
  <div class="layout-row">
    <RoomCard title="Build Step" only-show>
      <template #content>
        <div class="line mb-2 flex items-center text-base">
          <span class="mr-1 basis-1/4">构建状态：</span>
          <BuildStatusTag
            :build-status="currentBuildData?.status"
          ></BuildStatusTag>
        </div>
        <div class="line mb-2 flex items-center text-base">
          <span class="mr-1 basis-1/4">构建版本：</span>
          <span class="text-base text-black-default font-semibold"
            >Version {{ currentBuildData?.buildVersion }}</span
          >
        </div>
        <div class="line mb-2 flex items-center text-base">
          <span class="mr-1 basis-1/4">触发时间：</span>
          <span class="text-base text-black-default font-semibold">{{
            dateTransformer(currentBuildData?.createDate, true)
          }}</span>
        </div>
        <div class="line mb-2 flex items-center text-base">
          <span class="mr-1 basis-1/4">构建分支：</span>
          <span class="text-base text-black-default font-semibold">{{
            currentBuildData?.buildBranch
          }}</span>
        </div>
        <div class="line mb-4 flex items-center text-base">
          <span class="mr-1 basis-1/4">触发人：</span>
          <span class="text-base text-black-default font-semibold">{{
            currentBuildData?.buildByName
          }}</span>
        </div>
        <div>
          <a-button
            type="primary"
            @click="
              $router.push({
                name: 'ProjectSettingIndex',
                params: {
                  settingNav: 'build',
                },
              })
            "
            >构建配置</a-button
          >
        </div>
      </template>
    </RoomCard>
  </div>
  <div class="layout-row">
    <div class="card card-bottomless flex-grow flex flex-col">
      <div
        class="header rounded-t-lg bg-white -m-6 p-6 flex justify-between flex-grow items-center sticky -top-2"
      >
        <div class="title text-xl font-extrabold">构建日志</div>
        <div class="toolbar flex">
          <a-button type="primary" class="mr-4" size="large">
            <template #icon>
              <icon-arrow-down />
            </template>
          </a-button>
          <a-button type="primary" size="large">
            <template #icon>
              <icon-arrow-up />
            </template>
          </a-button>
        </div>
      </div>
      <div
        ref="logContent"
        class="log-content rounded-b-lg -mx-6 mt-6 p-6 text-base text-slate-50 font-semibold bg-black-default"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-row {
  display: flex;
}
.card.card-bottomless {
  padding-bottom: 0;
}
</style>
