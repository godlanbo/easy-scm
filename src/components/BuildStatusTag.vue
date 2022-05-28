<script setup lang="ts">
import { BUILD_STATUS } from '../utils'
defineProps<{
  buildStatus?:
    | BuildStatus.Success
    | BuildStatus.Failed
    | BuildStatus.Canceled
    | BuildStatus.Loading
}>()
</script>
<template>
  <div class="build-status-tag">
    <a-tag v-if="buildStatus === BUILD_STATUS.Failed" color="red" size="small"
      >Failed</a-tag
    >
    <a-tag
      v-else-if="buildStatus === BUILD_STATUS.Success"
      color="green"
      size="small"
      >Success</a-tag
    >
    <a-tag
      v-else-if="buildStatus === BUILD_STATUS.Canceled"
      color="gray"
      size="small"
      >Canceled</a-tag
    >
    <a-spin v-else-if="buildStatus === BUILD_STATUS.Loading" />
  </div>
</template>
<style lang="scss" scoped></style>
