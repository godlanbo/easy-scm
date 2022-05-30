<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RoomCard from '../../components/RoomCard.vue'
import { dateTransformer, BUILD_STATUS } from '../../utils'
import UploadImage from '../../components/UploadImage.vue'
import ListItem from '../../components/ListItem.vue'
import List from '../../components/List.vue'
import { useProjectStore, useRoomStore, useUserStore } from '../../store'
import BuildStatusTag from '../../components/BuildStatusTag.vue'
import { getRoomBuildList, getRoomMemberList } from '../../api'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const roomStore = useRoomStore()
const projectStore = useProjectStore()
const buildData = ref<BuildInfo[]>([])
const memberData = ref<User[]>([])
const buildCount = ref(0)

onMounted(async () => {
  try {
    await roomStore.checkRoomExist()
    await projectStore.getRoomProjectList()
  } catch {
    router.push({
      name: 'CreateRoom',
    })
  }
})

watchEffect(async () => {
  if (roomStore.roomInfo) {
    const rawRoomBuildRes = await getRoomBuildList(roomStore.roomInfo.id)
    const rawRoomMemberRes = await getRoomMemberList(roomStore.roomInfo.id)
    buildCount.value = rawRoomBuildRes.data.length
    buildData.value = rawRoomBuildRes.data.slice(0, 6)
    memberData.value = rawRoomMemberRes.data
  }
})

function handleToProjects(projectInfo: ProjectInfo) {
  projectStore.setCurrentProject(projectInfo)
  router.push({
    name: 'ProjectOverview',
    params: { projectId: projectInfo.id },
  })
}

function handleCardNavTo(routeName: string) {
  router.push({
    name: routeName,
  })
}
console.log(route.params)
</script>
<template>
  <div class="overview-container">
    <div class="overview-row">
      <RoomCard :title="`${roomStore.roomInfo?.owner}的空间`" only-show>
        <template #toolbar>
          <div class="text-gray-400">
            <span>创建于：</span>
            <span>{{ dateTransformer(roomStore.roomInfo?.createDate) }}</span>
          </div>
        </template>
        <template #content>
          <p class="mb-6 text-base">{{ roomStore.roomInfo?.desc }}</p>
          <div class="flex flex-grow">
            <div
              class="pro-part relative mr-2 cursor-pointer hover:bg-gray-lighter transition-colors duration-200 basis-1/4 rounded-md overflow-hidden bg-gray-light"
              @click="
                $router.push({
                  name: 'Projects',
                })
              "
            >
              <div class="part-decoration h-2 bg-gray-200"></div>
              <div class="absolute text-base text-black-default right-2 top-4">
                <span class="icon-arrow-right"></span>
              </div>
              <div class="part-body p-2">
                <div class="part-title text-lg text-black-default">
                  项目数量
                </div>
                <div
                  class="part-content text-xl font-semibold text-black-default"
                >
                  {{ roomStore.roomInfo?.projectsNum }}
                </div>
              </div>
            </div>
            <div
              class="build-part relative mr-2 cursor-pointer hover:bg-gray-lighter transition-colors duration-200 basis-1/4 rounded-md overflow-hidden bg-gray-light"
              @click="
                $router.push({
                  name: 'Members',
                })
              "
            >
              <div class="part-decoration h-2 bg-gray-200"></div>
              <div class="absolute text-base text-black-default right-2 top-4">
                <span class="icon-arrow-right"></span>
              </div>
              <div class="part-body p-2">
                <div class="part-title text-lg text-black-default">
                  成员数量
                </div>
                <div
                  class="part-content text-xl font-semibold text-black-default"
                >
                  {{ roomStore.roomInfo?.membersNum }}
                </div>
              </div>
            </div>
            <div
              class="member-part relative cursor-pointer hover:bg-gray-lighter transition-colors duration-200 basis-1/4 rounded-md overflow-hidden bg-gray-light"
            >
              <div class="part-decoration h-2 bg-gray-200"></div>
              <div class="part-body p-2">
                <div class="part-title text-lg text-black-default">
                  构建次数
                </div>
                <div
                  class="part-content text-xl font-semibold text-black-default"
                >
                  {{ buildCount }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </RoomCard>
      <UploadImage
        class="mt-6 ml-4"
        :src="roomStore.roomInfo?.cover"
      ></UploadImage>
    </div>
    <div class="overview-row">
      <RoomCard
        title="Projects"
        min-height="424"
        :basic="60"
        @on-title-click="handleCardNavTo('Projects')"
      >
        <template #toolbar>
          <a-button
            shape="round"
            type="primary"
            @click="
              $router.push({
                name: 'CreateRepo',
              })
            "
            >Add Project +</a-button
          >
        </template>
        <template #content>
          <List>
            <ListItem
              v-for="projectItem in projectStore.currentRoomProjectList"
              :key="projectItem.id"
              :title="projectItem.name"
              :description="projectItem.desc"
              :cover="projectItem.cover"
              need-placeholder
              @click="handleToProjects(projectItem)"
            ></ListItem>
          </List>
        </template>
      </RoomCard>
      <RoomCard title="Builds" min-height="424" :basic="36">
        <template #content>
          <List>
            <ListItem
              v-for="buildItem in buildData"
              :key="buildItem.id"
              @click="
                $router.push({
                  name: 'ProjectBuild',
                  params: {
                    projectId: buildItem.belongProject,
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
                    <span class="mr-1 underline decoration-border-gray">{{
                      buildItem.belongProjectName
                    }}</span>
                    <BuildStatusTag
                      :build-status="buildItem.status"
                    ></BuildStatusTag>
                  </div>
                  <p class="desc flex-grow text-gray-500">
                    Build branch@{{ buildItem.buildBranch }}
                  </p>
                </div>
              </template>
            </ListItem>
          </List>
        </template>
      </RoomCard>
    </div>
    <div class="overview-row">
      <RoomCard
        title="Members"
        min-height="424"
        @on-title-click="handleCardNavTo('Members')"
      >
        <template #toolbar>
          <a-button shape="round" type="primary">Add Member +</a-button>
        </template>
        <template #content>
          <List>
            <ListItem
              v-for="memberItem in memberData"
              :key="memberItem.id"
              :title="memberItem.name"
              :description="memberItem.eamil"
              :is-cover="false"
              :cover="memberItem.avatar"
              :can-click="false"
            >
            </ListItem>
          </List>
        </template>
      </RoomCard>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  background-color: #fff;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  overflow: hidden;
  // color: #676c6f;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  min-width: 264px;
  padding: 24px;
  transition: all 0.2s ease;
  @apply shadow-card;
}
.overview-container {
  .overview-row {
    @apply flex;
  }
}
</style>
