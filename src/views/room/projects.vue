<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import RoomCard from '../../components/RoomCard.vue'
import ListItem from '../../components/ListItem.vue'
import { dateTransformer } from '../../utils'
import List from '../../components/List.vue'
import { getRoomProjectList } from '../../api'
import { useProjectStore } from '../../store'
import { useRouter } from 'vue-router'
const projectData = ref<ProjectInfo[]>([])
const projectStore = useProjectStore()
const router = useRouter()
watchEffect(async () => {
  const rawRoomProjectRes = await getRoomProjectList()
  projectData.value = rawRoomProjectRes.data
})

function handleToProjects(projectInfo: ProjectInfo) {
  projectStore.setCurrentProject(projectInfo)
  router.push({
    name: 'ProjectOverview',
    params: { projectId: projectInfo.id },
  })
}

function handleSearchList(searchValue: string) {
  console.log(searchValue)
}
</script>
<template>
  <div class="projects">
    <section class="projects-row">
      <RoomCard title="Projects" only-show min-height="480">
        <template #toolbar>
          <div class="flex">
            <a-input-search
              class="mr-4"
              search-button
              placeholder="Search project name"
              @press-enter="handleSearchList($event.target.value)"
              @search="handleSearchList"
            ></a-input-search>
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
          </div>
        </template>
        <template #content>
          <List>
            <ListItem
              v-for="projectItem in projectData"
              :key="projectItem.id"
              :title="projectItem.name"
              :description="projectItem.desc"
              :cover="projectItem.cover"
              need-placeholder
              @click="handleToProjects(projectItem)"
            >
              <template #detail>
                <div class="list-item-detail self-start">
                  <div class="detail-title mb-1 text-base text-black-default">
                    Version: {{ projectItem.version }}
                  </div>
                  <div class="detail-info flex-grow text-gray-500">
                    <div class="mb-1">
                      创建于：{{ dateTransformer(projectItem.createDate) }}
                    </div>
                    <div>
                      最后更新于：{{ dateTransformer(projectItem.updateDate) }}
                    </div>
                  </div>
                </div>
              </template>
            </ListItem>
          </List>
        </template>
      </RoomCard>
    </section>
  </div>
</template>
<style lang="scss" scoped></style>
