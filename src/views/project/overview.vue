<script setup lang="ts">
import RoomCard from '../../components/RoomCard.vue'
import { useProjectStore } from '../../store'
import UploadImage from '../../components/UploadImage.vue'
import { dateTransformer, BUILD_STATUS } from '../../utils'
import ListItem from '../../components/ListItem.vue'
import { reactive } from 'vue'
import List from '../../components/List.vue'
import BuildStatusTag from '../../components/BuildStatusTag.vue'
const projectStore = useProjectStore()
const buildData = reactive<BuildInfo[]>([])
const currentProjectInfo = projectStore.currentProjectInfo

function handleSearchList(searchValue: string) {
  console.log(searchValue)
}
</script>
<template>
  <div class="project-container">
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
              <UploadImage class="w-56 h-40"></UploadImage>
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
              v-for="buildItem in buildData"
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
              placeholder="Search project name"
              @press-enter="handleSearchList($event.target.value)"
              @search="handleSearchList"
            ></a-input-search>
            <a-button type="primary">触发构建</a-button>
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
