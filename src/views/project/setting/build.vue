<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import RoomCard from '../../../components/RoomCard.vue'
import List from '../../../components/List.vue'
import { getProjectInfo, patchProjectTriggerConfig } from '../../../api'
import { useProjectStore } from '../../../store'
import { useRoute } from 'vue-router'
import { BUILD_ENV_LIST } from '../../../utils'
import { Message } from '@arco-design/web-vue'

const projectStore = useProjectStore()
const currentProjectInfo = ref<ProjectInfo | null>(
  projectStore.currentProjectInfo,
)
const dialogVisible = ref(false)
const route = useRoute()

onMounted(async () => {
  const rawProjectInfoRes = await getProjectInfo(+route.params.projectId)
  currentProjectInfo.value = rawProjectInfoRes.data
  projectStore.setCurrentProject(currentProjectInfo.value)
})

const bufferBuildConfig = reactive<{
  resDir: string
  buildFile: string
  buildEnv: string
}>({
  resDir: '',
  buildFile: '',
  buildEnv: '',
})

async function handleSaveProjectBuildModify() {
  if (currentProjectInfo.value) {
    await patchProjectTriggerConfig({
      ...currentProjectInfo.value,
      ...bufferBuildConfig,
    })
    await projectStore.refreshProjectInfo(currentProjectInfo.value.id)
    currentProjectInfo.value = projectStore.currentProjectInfo
    Message.success('更新成功')
    dialogVisible.value = false
  }
}
function handleBeforeOpenModal() {
  if (currentProjectInfo.value) {
    bufferBuildConfig.buildFile = currentProjectInfo.value.buildFile
    bufferBuildConfig.resDir = currentProjectInfo.value.resDir
    bufferBuildConfig.buildEnv = currentProjectInfo.value.buildEnv
  }
}
</script>
<template>
  <a-modal
    v-model:visible="dialogVisible"
    title="修改构建配置"
    @cancel="dialogVisible = false"
    @ok="handleSaveProjectBuildModify"
    @before-open="handleBeforeOpenModal"
  >
    <div class="flex items-center mb-2">
      <div class="mask mr-4">产物目录：</div>
      <div class="flex-grow">
        <a-input
          v-model="bufferBuildConfig.resDir"
          placeholder="输入项目名称"
        ></a-input>
      </div>
    </div>
    <div class="flex items-center mb-2">
      <div class="mask mr-4">构建脚本：</div>
      <div class="flex-grow">
        <a-input
          v-model="bufferBuildConfig.buildFile"
          placeholder="输入项目名称"
        ></a-input>
      </div>
    </div>
    <div class="flex items-center">
      <div class="mask mr-4">构建环境：</div>
      <div class="flex-grow">
        <a-select
          v-model="bufferBuildConfig.buildEnv"
          placeholder="Please select auto trigger branch"
        >
          <template #label="{ data }">
            <span class="flex items-center">
              <span class="icon-node-js mr-1 text-base text-green-nodejs"></span
              >{{ data?.label }}</span
            >
          </template>
          <a-option
            v-for="(env, index) in BUILD_ENV_LIST"
            :key="index"
            :value="env.imageTag"
            >{{ env.name }}</a-option
          >
        </a-select>
      </div>
    </div>
  </a-modal>
  <div class="layout-row">
    <RoomCard title="构建配置" only-show>
      <template #content>
        <List class="mb-4">
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">产物目录：</div>
            <div class="text-base font-bold">
              {{ currentProjectInfo?.resDir }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">构建脚本：</div>
            <div class="text-base font-bold">
              {{ currentProjectInfo?.buildFile }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">构建环境：</div>
            <div class="text-base font-bold">
              Node.js V{{ currentProjectInfo?.buildEnv }}
            </div>
          </div>
          <!-- <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">创建时间：</div>
            <div class="text-base font-bold">
              {{ dateTransformer(currentProjectInfo?.createdDate, true) }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">最后更新时间：</div>
            <div class="text-base font-bold">
              {{ dateTransformer(currentProjectInfo?.updateDate, true) }}
            </div>
          </div> -->
        </List>
        <div class="toolbar">
          <a-button type="primary" @click="dialogVisible = true"
            >编辑构建配置</a-button
          >
        </div>
      </template>
    </RoomCard>
  </div>
</template>
<style lang="scss" scoped>
.layout-row {
  display: flex;
}
.list-line {
  &:nth-child(even) {
    &::before {
      @apply bg-gray-900/[0.02];
    }
  }
  &::before {
    content: '';
    position: absolute;
    left: -24px;
    right: -24px;
    top: 0;
    height: 100%;
    pointer-events: none;
  }
}
</style>
