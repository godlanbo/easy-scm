<script setup lang="ts">
const props = defineProps<{
  src?: string
}>()
</script>
<template>
  <div
    class="upload-img-container w-64 h-64 rounded-lg overflow-hidden relative"
  >
    <img
      v-if="src"
      :src="src"
      alt="image"
      class="cover w-full h-full object-cover"
    />
    <template v-else>
      <div
        class="placeholder-cover cursor-pointer text-9xl w-full h-full flex items-center justify-center bg-theme-primary/20"
      >
        <i class="icon-fire text-theme-primary"></i>
      </div>
      <input
        id="cover-upload"
        class="hidden"
        type="file"
        accept="image/png, image/jpeg, image/gif, image/jpg"
      />
      <label
        for="cover-upload"
        class="placeholder-mask cursor-pointer absolute opacity-0 left-0 top-0 text-white font-semibold text-lg w-full h-full flex justify-center items-center"
      >
        <span class="z-10">
          <span class="mr-2">Upload Cover</span>
          <i class="icon-upload inline"></i>
        </span>
      </label>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.placeholder-cover {
  // opacity: 0;
  // background-color: #000;
}
.placeholder-mask {
  &::before {
    position: absolute;
    left: 0;
    top: 0;
    content: '';
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: #000;
  }
  &:hover {
    opacity: 1;
    &::before {
      opacity: 0.3;
    }
  }
}
</style>
