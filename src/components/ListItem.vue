<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    cover?: string
    canClick?: boolean
    isCover?: boolean
  }>(),
  {
    canClick: true,
    isCover: true,
  },
)
</script>
<template>
  <div
    class="list-item-container py-3 flex justify-between items-center bg-white relative"
    :class="{
      'cursor-pointer': canClick,
    }"
  >
    <div
      class="list-item-meta flex"
      :class="[isCover ? 'items-start' : 'items-center']"
    >
      <template v-if="cover">
        <div
          v-if="isCover"
          class="cover w-28 h-20 overflow-hidden rounded-lg mr-4"
        >
          <img
            :src="cover"
            alt="meta-cover"
            class="w-full h-full object-cover"
          />
        </div>
        <div v-else class="avatar w-16 h-16 rounded-full overflow-hidden mr-4">
          <img
            :src="cover"
            alt="meta-avatar"
            class="w-full h-full object-cover"
          />
        </div>
      </template>
      <slot name="meta">
        <div class="meta-info flex flex-col justify-between">
          <div class="title mb-1 text-lg font-semibold text-black-default">
            {{ title }}
          </div>
          <p class="desc flex-grow text-gray-500">{{ description }}</p>
        </div>
      </slot>
    </div>
    <slot name="detail"></slot>
    <!-- <slot name="operate"></slot> -->
    <!-- <div class="list-item-detail"></div> -->

    <slot name="operate">
      <div
        v-if="canClick"
        class="list-item-operate font-semibold text-base opacity-[0.38]"
      >
        <i class="icon-arrow-right"></i>
      </div>
    </slot>
  </div>
</template>
<style lang="scss" scoped>
.list-item-container {
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
  &:hover {
    &::before {
      @apply bg-gray-900/[0.03];
    }
  }

  &:hover {
    .list-item-operate {
      opacity: 1;
    }
  }
}
</style>
