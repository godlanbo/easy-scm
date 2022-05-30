<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import RoomCard from '../../components/RoomCard.vue'
import ListItem from '../../components/ListItem.vue'
import List from '../../components/List.vue'
import { getRoomMemberList } from '../../api'
import { useRoomStore } from '../../store'

const memberData = ref<User[]>([])
const roomStore = useRoomStore()
watchEffect(async () => {
  if (roomStore.roomInfo) {
    const rawMemberList = await getRoomMemberList(roomStore.roomInfo.id)
    memberData.value = rawMemberList.data
  }
})
</script>
<template>
  <div class="members-container">
    <section class="member-row">
      <RoomCard title="Members" only-show min-height="480">
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
    </section>
  </div>
</template>
<style lang="scss" scoped></style>
