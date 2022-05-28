<script setup lang="ts">
import { useProjectStore } from '../../../store'
import { dateTransformer } from '../../../utils'
import RoomCard from '../../../components/RoomCard.vue'
import List from '../../../components/List.vue'

const projectStore = useProjectStore()
const currentProjectInfo = projectStore.currentProjectInfo
</script>
<template>
  <!-- <div class="demo-container">general setting</div> -->
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
          <a-button type="primary">编辑项目名称</a-button>
        </div>
      </template>
    </RoomCard>
  </div>
  <div class="layout-row">
    <RoomCard title="自动构建设置" only-show>
      <template #content>
        <p class="text-base text-black-default mb-4">
          自动构建设置能在指定的分支触发更新之后，自动的构建你的项目。
        </p>
        <div class="flex items-center">
          <div class="w-64 mr-4">
            <a-input-tag
              :default-value="['main']"
              placeholder="自动构建分支"
            ></a-input-tag>
          </div>
          <a-switch />
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
          <a-button type="primary" status="danger">删除这个项目</a-button>
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
