<script setup lang="ts">
import { useProjectStore } from '../../../store'
import { dateTransformer } from '../../../utils'
import RoomCard from '../../../components/RoomCard.vue'
import List from '../../../components/List.vue'
import { useRoute } from 'vue-router'
import {
  deleteProject,
  getProjectInfo,
  patchProjectTriggerConfig,
} from '../../../api'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { Message } from '@arco-design/web-vue'

const projectStore = useProjectStore()
const currentProjectInfo = ref<ProjectInfo | null>(
  projectStore.currentProjectInfo,
)

onMounted(async () => {
  const rawProjectInfoRes = await getProjectInfo(+route.params.projectId)
  currentProjectInfo.value = rawProjectInfoRes.data
  projectStore.setCurrentProject(currentProjectInfo.value)
})

const route = useRoute()
const dialogVisible = ref(false)

async function handleDeleteProject() {
  const projectId = +route.params.projectId
  await deleteProject(projectId)
}

const bufferAutoTriggerInfo = ref({
  autoTrigger: !!currentProjectInfo.value?.autoTrigger,
  triggerBranch: [currentProjectInfo.value?.triggerBranch ?? ''],
})

watchEffect(() => {
  bufferAutoTriggerInfo.value = {
    autoTrigger: !!currentProjectInfo.value?.autoTrigger,
    triggerBranch: [currentProjectInfo.value?.triggerBranch ?? ''],
  }
})

const bufferProjectName = ref('')

function handleTriggerBranchModify(enterValue?) {
  console.log(enterValue)
  if (enterValue) {
    bufferAutoTriggerInfo.value.triggerBranch = [enterValue]
  }
}

async function handleSaveProjectTriggerConfig() {
  if (currentProjectInfo.value) {
    await patchProjectTriggerConfig({
      ...currentProjectInfo.value,
      triggerBranch: bufferAutoTriggerInfo.value.triggerBranch[0],
      autoTrigger: bufferAutoTriggerInfo.value.autoTrigger as boolean,
    })
    await projectStore.refreshProjectInfo(currentProjectInfo.value.id)
    currentProjectInfo.value = projectStore.currentProjectInfo
    Message.success('更新成功')
    editAutoTrigger.value = false
  }
}

async function handleSaveProjectNameModify() {
  if (currentProjectInfo.value) {
    await patchProjectTriggerConfig({
      ...currentProjectInfo.value,
      name: bufferProjectName.value,
    })
    await projectStore.refreshProjectInfo(currentProjectInfo.value.id)
    currentProjectInfo.value = projectStore.currentProjectInfo
    Message.success('更新成功')
    dialogVisible.value = false
  }
}

function handleBeforeOpenModal() {
  if (currentProjectInfo.value) {
    bufferProjectName.value = currentProjectInfo.value.name
  }
}

const editAutoTrigger = ref(false)
</script>
<template>
  <!-- <div class="demo-container">general setting</div> -->
  <a-modal
    v-model:visible="dialogVisible"
    title="修改项目名称"
    @cancel="dialogVisible = false"
    @ok="handleSaveProjectNameModify"
    @before-open="handleBeforeOpenModal"
  >
    <div class="flex items-center">
      <div class="mask mr-4">项目名称：</div>
      <div class="flex-grow">
        <a-input
          v-model="bufferProjectName"
          placeholder="输入项目名称"
        ></a-input>
      </div>
    </div>
  </a-modal>
  <div class="layout-row">
    <RoomCard title="项目基本信息" only-show>
      <template #content>
        <List class="mb-4">
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">项目名称：</div>
            <div class="text-base font-bold">
              {{ currentProjectInfo?.name }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">所有者：</div>
            <div class="text-base font-bold">
              {{ currentProjectInfo?.owner }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">项目ID：</div>
            <div class="text-base font-bold">
              {{ currentProjectInfo?.id }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">创建时间：</div>
            <div class="text-base font-bold">
              {{ dateTransformer(currentProjectInfo?.createDate, true) }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">最后更新时间：</div>
            <div class="text-base font-bold">
              {{ dateTransformer(currentProjectInfo?.updateDate, true) }}
            </div>
          </div>
        </List>
        <div class="toolbar">
          <a-button type="primary" @click="dialogVisible = true"
            >编辑项目名称</a-button
          >
        </div>
      </template>
    </RoomCard>
  </div>
  <div v-if="currentProjectInfo" class="layout-row">
    <RoomCard title="自动构建设置" only-show>
      <template #content>
        <p class="text-base text-black-default mb-4">
          自动构建设置能在指定的分支触发更新之后，自动的构建你的项目。
        </p>
        <div class="flex items-center mb-6">
          <div class="w-64 mr-4">
            <a-input-tag
              :model-value="bufferAutoTriggerInfo.triggerBranch"
              :disabled="!editAutoTrigger"
              :default-value="[currentProjectInfo.triggerBranch]"
              placeholder="自动构建分支"
              @press-enter="handleTriggerBranchModify"
              @remove="bufferAutoTriggerInfo.triggerBranch = []"
            ></a-input-tag>
          </div>
          <a-switch
            v-model="bufferAutoTriggerInfo.autoTrigger"
            :disabled="!editAutoTrigger"
            :default-checked="!!currentProjectInfo.autoTrigger"
          />
        </div>
        <div class="toolbar">
          <template v-if="!editAutoTrigger">
            <a-button type="primary" @click="editAutoTrigger = true"
              >编辑配置</a-button
            >
          </template>
          <template v-else>
            <div class="flex">
              <a-button
                class="mr-4"
                type="primary"
                @click="handleSaveProjectTriggerConfig"
                >保存</a-button
              >
              <a-button @click="editAutoTrigger = false">取消</a-button>
            </div>
          </template>
        </div>
      </template>
    </RoomCard>
  </div>
  <div class="layout-row">
    <RoomCard title="删除项目" only-show>
      <template #content>
        <p class="text-base text-black-default mb-4">
          一旦你删除了这个项目，就没有回头路了。
        </p>
        <div>
          <a-button type="primary" status="danger" @click="handleDeleteProject"
            >删除这个项目</a-button
          >
        </div>
      </template>
    </RoomCard>
  </div>
</template>
<style lang="scss" scoped>
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
