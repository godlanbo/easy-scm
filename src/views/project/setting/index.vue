<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { onActivated, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Build from './build.vue'
import General from './general.vue'

const route = useRoute()

const currentComp = computed(() => {
  return route.params.settingNav === 'build' ? Build : General
})
</script>
<template>
  <component :is="currentComp"></component>
</template>
<style lang="scss" scoped></style>
