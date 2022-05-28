<script setup lang="ts">
import { computed, reactive, Ref, ref, watch, watchEffect } from 'vue'
import { IconSearch } from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/es/button/style/css.js'
import ExploreCard from '../components/ExploreCard.vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
// console.log('777')
const currentExploreType = ref<ExploreType>(route.params.type as any)
const currentExploreFilter = ref<ExploreFilterType>('all')
function handleSearchList(arg) {
  console.log('search-button', arg)
}

function handleRouteToProject(owner: string, proId: number) {
  // router.push({
  //   name:
  // })
  console.log('router push project ')
}
function handleRouteToRoom(owner: string) {
  router.push({
    name: 'Overview',
    params: {
      owner,
    },
  })
}

function handleSwitchMyCollect(type: ExploreType) {
  currentExploreType.value = type
  currentExploreFilter.value = 'collected'
}

// 切换探索类型时，变更路由参数
watch(currentExploreType, val => {
  router.push({
    name: 'Explore',
    params: {
      type: val,
    },
  })
})
const roomDataList = reactive<ExploreRoomItem[]>([
  {
    id: '10',
    owner: 'godlanbo',
    cover:
      'https://repository-images.githubusercontent.com/293860197/7fd72080-496d-11eb-8fe0-238b38a0746a',
    desc: `An infographics generator with 30+ plugins and 200+ options to
              display stats about your GitHub account and render them as SVG,
              Markdown, PDF or JSON!`,
    membersNum: 10,
    projectsNum: 9,
    createDate: '1651752179061',
    isCollect: false,
    type: 'room',
    ownerId: 'godlanbo',
  },
  {
    id: '11',
    owner: 'zzz',
    ownerId: 'zzz',
    // cover:
    //   'https://repository-images.githubusercontent.com/293860197/7fd72080-496d-11eb-8fe0-238b38a0746a',
    desc: `An infographics generator with 30+ plugins and 200+ options to
              display stats about your GitHub account and render them as SVG,
              Markdown, PDF or JSON!`,
    membersNum: 6,
    projectsNum: 9,
    createDate: '1651752171061',
    isCollect: true,
    type: 'room',
  },
])

const proDataList = reactive<ExploreProjectItem[]>([])

// let dataList = ref<ExploreItem[]>(roomDataList)

// watchEffect(() => {
//   console.log('watchEffect')
//   dataList.value =
//     currentExploreType.value === 'room' ? roomDataList : proDataList
// })

function filterAllDataList(rawList: Ref<ExploreItem>) {
  rawList.value
}
watchEffect(() => {
  // currentExploreFilter.value === 'all'
})

let dataList = computed(() => {
  let res: (ExploreProjectItem | ExploreRoomItem)[] =
    currentExploreType.value === 'room' ? roomDataList : proDataList
  if (currentExploreFilter.value === 'collected') {
    res = res.filter(item => item.isCollect)
  }
  return res
})

function handleCollectExplore(item: ExploreItem) {
  item.isCollect = !item.isCollect
}
</script>
<template>
  <div class="explore-container flex">
    <div class="personal-info-wrapper px-4">
      <div class="personal-info avatar-card card items-center">
        <div class="w-1/3 mt-8">
          <img
            class="avatar w-full h-full overflow-hidden align-middle"
            src="../assets/images/logo.png"
            alt="avatar"
          />
        </div>
        <div class="nickname my-6 font-semibold text-2xl">
          <span>godlanbo</span>
        </div>
        <div
          class="favorite-detail font-semibold flex items-center w-full border-t border-solid p-3 border-border-gray"
        >
          <div class="prefix text-xl text-pink-400 mr-2">
            <i class="icon-collect-full"></i>
          </div>
          <div
            class="text-theme-primary font-semibold cursor-pointer hover:underline"
            @click="handleSwitchMyCollect('room')"
          >
            <span>我收藏的空间：</span>
            <span>6</span>
          </div>
        </div>
        <div
          class="favorite-detail font-semibold flex items-center w-full border-t border-solid p-3 border-border-gray"
        >
          <div class="prefix text-xl text-pink-400 mr-2">
            <i class="icon-collect-full"></i>
          </div>
          <div
            class="text-theme-primary font-semibold cursor-pointer hover:underline"
            @click="handleSwitchMyCollect('project')"
          >
            <span>我收藏的项目：</span>
            <span>8</span>
          </div>
        </div>
        <div
          class="font-semibold flex items-center w-full border-t border-solid p-3 border-border-gray"
        >
          <div class="prefix text-xl text-theme-text mr-2">
            <i class="icon-home"></i>
          </div>
          <div
            class="text-theme-primary font-semibold cursor-pointer hover:underline"
          >
            <span>我的空间</span>
          </div>
        </div>
      </div>
    </div>
    <div class="explore-list px-4">
      <div class="explore-list-navigation flex">
        <a-radio-group v-model="currentExploreType" class="mr-4" type="button">
          <a-radio value="room">room</a-radio>
          <a-radio value="project">project</a-radio>
        </a-radio-group>
        <a-input-search
          class="mr-4"
          :style="{ width: '320px' }"
          placeholder="输入搜索"
          search-button
          @press-enter="handleSearchList($event.target.value)"
          @search="handleSearchList"
        >
          <template #button-icon>
            <icon-search />
          </template>
          <template #button-default> Search </template>
        </a-input-search>
        <a-radio-group
          v-model="currentExploreFilter"
          class="mr-4"
          type="button"
        >
          <a-radio value="all">全部</a-radio>
          <a-radio value="collected">已收藏</a-radio>
        </a-radio-group>
      </div>
      <!-- <div class="mt-6 font-semibold text-xl">这里有一行字：</div> -->
      <div
        class="explore-list-content mt-6 flex flex-wrap justify-between items-start"
      >
        <explore-card
          v-for="articleData in dataList"
          :key="articleData.id"
          :article-data="articleData"
          @on-collect="handleCollectExplore"
          @on-jump-project="handleRouteToProject"
          @on-jump-room="handleRouteToRoom"
        ></explore-card>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.avatar-card {
  margin-top: 0;
  padding: 0;
  box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04);
}
.explore-container {
  .personal-info-wrapper {
    flex: 1;
    .personal-info {
      box-shadow: 0 3px 6px rgba(140, 149, 159, 0.15);
      .avatar {
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.15);
      }
    }
  }
  .explore-list {
    flex: 0 0 70%;
  }
}
</style>
