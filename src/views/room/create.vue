<script setup lang="ts">
import { reactive } from 'vue'
import UploadImage from '../../components/UploadImage.vue'
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon'
import { createRoom } from '../../api'
import { useRoomStore } from '../../store'
import { useRouter } from 'vue-router'

const roomStore = useRoomStore()
const router = useRouter()
const editRoomInfo = reactive({
  desc: '',
  cover: '',
})
function handleImageUpload(imgSrc: string) {
  editRoomInfo.cover = imgSrc
}

async function handleCreateRoom() {
  const craeteRoomRes = await createRoom(editRoomInfo)
  roomStore.initRoomInfo(craeteRoomRes.data)
  router.push({
    name: 'Overview',
    params: {
      owner: craeteRoomRes.data.owner,
    },
  })
}
</script>
<template>
  <div class="create-container card">
    <section class="main-content mx-auto py-8 w-1/2 flex flex-col">
      <header class="header text-3xl font-extrabold text-black-default mb-8">
        您还没有自己的工作空间
      </header>
      <main class="flex flex-col flex-grow mb-6">
        <div class="desc mb-6">
          <div class="title text-2xl font-extrabold text-black-default mb-2">
            现在开始创建一个工作空间
          </div>
          <div class="title-content text-base text-gray-600">
            创建一个属于您的工作空间，您可以在这下面组织你的项目和协作者，管理您的构建物料。
          </div>
        </div>
        <div class="edit flex items-stretch">
          <div class="mr-4 flex-grow flex flex-col">
            <a-textarea
              v-model="editRoomInfo.desc"
              class="flex-grow"
              placeholder="输入你对于你工作空间的描述"
              allow-clear
              auto-size
            />
          </div>
          <UploadImage
            class="h-40"
            :src="editRoomInfo.cover"
            @uploaded="handleImageUpload"
          ></UploadImage>
        </div>
        <div class="tip mt-4 text-gray-500">
          <icon-exclamation-circle-fill class="mr-1" />
          <span>描述是必须的，工作空间的封面可选</span>
        </div>
      </main>
      <footer>
        <a-button
          size="large"
          type="primary"
          shape="round"
          @click="handleCreateRoom"
          >创建工作空间</a-button
        >
      </footer>
    </section>
  </div>
</template>
<style lang="scss" scoped></style>
