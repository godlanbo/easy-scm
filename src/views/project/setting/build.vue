<script setup lang="ts">
import { reactive } from 'vue'
import RoomCard from '../../../components/RoomCard.vue'
import List from '../../../components/List.vue'

const mockBuildSettingData = reactive<BuildSetting>({
  // buildCommand: 'npm run build',
  buildEnvironment: 'Node v12.14.1',
  baseDirectory: '/res',
  buildFile: 'build.sh',
  // buildDepInitCommand: 'npm i',
})
</script>
<template>
  <div class="layout-row">
    <RoomCard title="构建配置" only-show>
      <template #content>
        <List class="mb-4">
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">基础目录：</div>
            <div class="text-base font-bold">
              {{ mockBuildSettingData?.baseDirectory }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">构建脚本：</div>
            <div class="text-base font-bold">
              {{ mockBuildSettingData?.buildFile }}
            </div>
          </div>
          <div class="list-line relative flex items-center mb-2 py-2">
            <div class="text-base basis-1/3">构建环境：</div>
            <div class="text-base font-bold">
              {{ mockBuildSettingData?.buildEnvironment }}
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
          <a-button type="primary">编辑构建配置</a-button>
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
