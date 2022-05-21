<script setup lang="ts">
import { computed } from '@vue/reactivity'

const props = withDefaults(
  defineProps<{
    minHeight?: string
    basic?: number
    title: string
    onlyShow?: boolean
  }>(),
  {
    basic: 0,
    title: '',
    onlyShow: false,
  },
)

const emit = defineEmits<{
  (e: 'onTitleClick'): void
}>()
function handleTitleClick() {
  if (!props.onlyShow) {
    emit('onTitleClick')
  }
}
// const cardHeightLimit = computed(() => {
//   return props.minHeight === 'unset' ? props.minHeight : `${props.minHeight}px`
// })
</script>
<template>
  <section
    class="card room-card flex flex-col"
    :style="{
      minHeight: minHeight ? `${minHeight}px` : 'unset',
      flex: `1 0 ${basic}%`,
    }"
  >
    <div
      class="card-header flex items-center justify-between mb-6 pb-2 border-b border-gray-light border-solid"
    >
      <div
        class="card-title"
        :class="{
          'only-show': onlyShow,
        }"
        @click="handleTitleClick"
      >
        <!-- <slot name="title"></slot> -->
        <div class="text-black-default text-2xl font-semibold">
          <div class="flex items-center">
            <span class="card-title-text">{{ title }}</span>
            <span class="card-title-icon icon-arrow-right text-xl"></span>
          </div>
        </div>
        <!-- <span>Site ></span> -->
      </div>
      <div class="card-toolbar">
        <!-- <span>1111</span> -->
        <slot name="toolbar"></slot>
      </div>
    </div>
    <div class="card-content flex-grow flex flex-col">
      <slot name="content"></slot>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.room-card {
  & + .room-card {
    margin-left: 16px;
  }
}
.card-title {
  cursor: pointer;
  &:hover {
    .card-title-text {
      text-decoration: none;
    }
  }
  .card-title-text {
    text-decoration: underline;
  }
  &.only-show {
    cursor: initial;
    .card-title-text {
      text-decoration: none;
    }
    .card-title-icon {
      display: none;
    }
  }
}
</style>
