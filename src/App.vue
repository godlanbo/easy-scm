<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { onMounted } from 'vue'
import { useUserStore } from './store'

// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const userStore = useUserStore()
onMounted(() => {
  userStore.registerUser()
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive> -->
    <component :is="Component" />
    <!-- </keep-alive> -->
  </router-view>
</template>

<style lang="scss" scoped></style>
