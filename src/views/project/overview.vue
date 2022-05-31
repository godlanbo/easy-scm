<script setup lang="ts">
import RoomCard from '../../components/RoomCard.vue'
import { useProjectStore } from '../../store'
import UploadImage from '../../components/UploadImage.vue'
import { dateTransformer, BUILD_STATUS } from '../../utils'
import ListItem from '../../components/ListItem.vue'
import { reactive, ref, watchEffect } from 'vue'
import List from '../../components/List.vue'
import BuildStatusTag from '../../components/BuildStatusTag.vue'
import { useRoute } from 'vue-router'
import {
  getBuildListByProject,
  getProjectInfo,
  getRepoBranchList,
  patchProjectInfo,
  triggerBuild,
} from '../../api'
import { computed } from '@vue/reactivity'
import { Message } from '@arco-design/web-vue'
const projectStore = useProjectStore()
const buildData = ref<BuildInfo[]>([])
const showBuildList = ref<BuildInfo[]>([])
const route = useRoute()
const projectInfo = ref<ProjectInfo | null>(projectStore.currentProjectInfo)
const currentProjectId = ref<string>(route.params.projectId as string)
const repoBranchList = ref<GithubRepoBranchItem[]>([])
const triggerBranch = ref('')
const dialogVisible = ref(false)
const isInTrigger = computed(() => {
  return (
    buildData.value.findIndex(item => item.status === BUILD_STATUS.Loading) !==
    -1
  )
})

watchEffect(async () => {
  const rawProjectInfoRes = await getProjectInfo(+currentProjectId.value)
  projectInfo.value = rawProjectInfoRes.data
  projectStore.setCurrentProject(projectInfo.value)
})

watchEffect(async () => {
  const rawBuildListRes = await getBuildListByProject(currentProjectId.value)
  buildData.value = rawBuildListRes.data
  showBuildList.value = buildData.value
})

function handleSearchList(searchValue: string) {
  console.log(searchValue)
  if (searchValue === '') {
    showBuildList.value = buildData.value
  } else {
    showBuildList.value = buildData.value.filter(item => {
      return item.buildBranch === searchValue
    })
  }
}
async function handleBeforeOpenModal() {
  if (projectInfo.value) {
    let res = await getRepoBranchList(
      projectInfo.value?.ownerId,
      projectInfo.value?.name,
    )
    repoBranchList.value = res.data
  }
}

async function handleTriggerBuild() {
  await triggerBuild(+route.params.projectId, triggerBranch.value)
  const rawBuildListRes = await getBuildListByProject(currentProjectId.value)
  buildData.value = rawBuildListRes.data
  showBuildList.value = buildData.value
}

async function handleCoverUpload(imgSrc: string) {
  if (projectInfo.value) {
    await patchProjectInfo({
      ...projectInfo.value,
      cover: imgSrc,
    })
    Message.success('上传成功')
    const rawProjectInfoRes = await getProjectInfo(+currentProjectId.value)
    projectInfo.value = rawProjectInfoRes.data
    projectStore.setCurrentProject(projectInfo.value)
  }
}
</script>
<template>
  <a-modal
    v-model:visible="dialogVisible"
    title="触发构建"
    @cancel="dialogVisible = false"
    @ok="handleTriggerBuild"
    @before-open="handleBeforeOpenModal"
  >
    <div class="flex items-center">
      <div class="mask mr-4">选择触发分支：</div>
      <div class="flex-grow">
        <a-select
          v-model="triggerBranch"
          placeholder="Please select trigger branch"
        >
          <a-option v-for="branch in repoBranchList" :key="branch.commit.sha">{{
            branch.name
          }}</a-option>
        </a-select>
      </div>
    </div>
  </a-modal>
  <div class="project-container">
    <div class="layout-row">
      <RoomCard
        class="max-w-2xl"
        only-show
        :title="projectInfo?.name"
        min-height="200"
      >
        <template #content>
          <div class="project-info flex">
            <div class="project-info-base flex flex-col flex-grow">
              <div class="desc text-black-default text-xl mb-4">
                {{ projectInfo?.desc }}
              </div>
              <div class="create-info text-base text-gray-500 mb-4">
                <span>导入自</span
                ><a
                  class="text-gray-500 hover:text-black-default"
                  :href="projectInfo?.repoUrl"
                  >Github</a
                >
                ,
                <span>创建于：</span>
                <span>{{ dateTransformer(projectInfo?.createDate) }}</span>
              </div>
              <div class="build-info text-base text-gray-500 mb-4">
                <span>当前版本：</span>
                <span>V{{ projectInfo?.version }}</span>
                ,
                <span>最后更新时间：</span>
                <span>{{ dateTransformer(projectInfo?.updateDate) }}</span>
              </div>
              <div class="toolbar">
                <a-button
                  type="primary"
                  @click="
                    $router.push({
                      name: 'ProjectSetting',
                    })
                  "
                  >项目设置</a-button
                >
              </div>
            </div>
            <div class="project-info-cover">
              <UploadImage
                :src="projectInfo?.cover"
                class="w-56 h-40"
                @uploaded="handleCoverUpload"
              ></UploadImage>
            </div>
          </div>
        </template>
      </RoomCard>
    </div>
    <div class="layout-row">
      <RoomCard only-show title="Build List" min-height="420">
        <template #content>
          <List>
            <ListItem
              v-for="buildItem in showBuildList"
              :key="buildItem.id"
              @click="
                $router.push({
                  name: 'ProjectBuild',
                  params: {
                    buildId: buildItem.id,
                  },
                })
              "
            >
              <template #meta>
                <div class="meta-info flex flex-col justify-between">
                  <div
                    class="title flex mb-1 text-lg font-semibold text-black-default"
                  >
                    <span class="mr-1 underline decoration-border-gray"
                      >Production: build branch@{{
                        buildItem.buildBranch
                      }}</span
                    >
                    <BuildStatusTag
                      :build-status="buildItem.status"
                    ></BuildStatusTag>
                  </div>
                  <p class="desc flex-grow text-gray-500">
                    <span class="mr-1">触发人：{{ buildItem.buildByName }}</span
                    >,
                    <span class="mr-1"
                      >触发时间：{{
                        dateTransformer(buildItem.createDate, true)
                      }}</span
                    >,
                    <span>构建版本：{{ buildItem.buildVersion }}</span>
                  </p>
                </div>
              </template>
            </ListItem>
          </List>
        </template>
        <template #toolbar>
          <div class="flex">
            <a-input-search
              class="mr-4"
              search-button
              placeholder="Search build branch"
              @press-enter="handleSearchList($event.target.value)"
              @search="handleSearchList"
            ></a-input-search>
            <a-button
              :disabled="isInTrigger"
              type="primary"
              @click="dialogVisible = true"
              >触发构建</a-button
            >
          </div>
        </template>
      </RoomCard>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout-row {
  display: flex;
}
</style>
