<script setup lang="ts">
import { dateTransformer } from '../utils'

defineProps<{
  articleData: ExploreItem
}>()

// 判断是不是空间的数据
function isRoomItem(exploreItem: ExploreItem): exploreItem is ExploreRoomItem {
  return exploreItem.type === 'room'
}
// 判断是不是项目的数据
function isProjectItem(
  exploreItem: ExploreItem,
): exploreItem is ExploreProjectItem {
  return exploreItem.type === 'project'
}

const emit = defineEmits<{
  (e: 'onCollect', item: ExploreItem): void
  (e: 'onJumpRoom', owner: string): void
  (e: 'onJumpProject', owner: string, projectId: number): void
}>()
function handleCollectExplore(item: ExploreItem) {
  emit('onCollect', item)
}
function handleClickProject(item: ExploreProjectItem) {
  emit('onJumpProject', item.owner, item.id)
}
function handleClickRoom(item: ExploreItem) {
  emit('onJumpRoom', item.owner)
}
</script>
<template>
  <article class="explore-card card mb-4">
    <template v-if="isRoomItem(articleData) && articleData.cover">
      <a href="">
        <img
          class="w-full align-middle h-[200px] object-cover bg-slate-300/80"
          :src="articleData.cover"
          alt="cover"
        /> </a
    ></template>
    <div class="flex flex-col">
      <div
        class="header bg-gray-100 px-4 py-3 flex items-center justify-between"
      >
        <div
          class="title font-semibold text-lg cursor-pointer decoration-2 underline-offset-2"
        >
          <div
            class="hover:underline inline"
            @click="handleClickRoom(articleData)"
          >
            <span>{{ articleData.owner }}</span>
            <span>的空间</span>
          </div>
          <template v-if="isProjectItem(articleData)">
            <span>{{ ' ' }}/{{ ' ' }}</span>
            <div
              class="hover:underline inline font-extrabold"
              @click="
                isProjectItem(articleData) && handleClickProject(articleData)
              "
            >
              <span>{{ articleData.name }}</span>
            </div>
          </template>
        </div>
        <div
          class="collect-status text-pink-400 flex items-center justify-center w-8 h-8 text-xl rounded-md border-border-gray border border-solid bg-white cursor-pointer"
          @click="handleCollectExplore(articleData)"
        >
          <i v-if="articleData.isCollect" class="icon-collect-full"></i>
          <i v-else class="icon-collect-line"></i>
        </div>
      </div>
      <div class="desc p-4 border-border-gray border-t border-solid text-base">
        {{ articleData.desc }}
      </div>
      <div
        class="footer p-4 flex items-center text-gray-500 border-border-gray border-t border-solid"
      >
        <div v-if="isRoomItem(articleData)" class="project-info mr-4">
          <i class="icon-project mr-1"></i>
          <span>{{ articleData.projectsNum }}</span>
        </div>
        <div v-if="isRoomItem(articleData)" class="member-info mr-4">
          <i class="icon-members mr-1"></i>
          <span>{{ articleData.membersNum }}</span>
        </div>
        <div v-if="isRoomItem(articleData)" class="create-date">
          <i class="icon-date mr-2"></i>
          <span>创建于：</span>
          <span>{{ dateTransformer(articleData.createDate) }}</span>
        </div>
        <div v-else class="update-date">
          <i class="icon-date mr-2"></i>
          <span>最后更新于：</span>
          <span>{{ dateTransformer(articleData.updateDate) }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
<style lang="scss" scoped>
.explore-card {
  padding: 0;
  margin: 0;
  box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
  flex: 0 0 48%;
}
</style>
