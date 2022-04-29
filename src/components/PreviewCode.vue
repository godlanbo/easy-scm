<script setup lang="ts">
import Prism from 'prismjs'
import { toRefs } from 'vue'
const props = defineProps({
  code: { type: String, default: '' },
  type: { type: String, default: 'html' },
})
const { code, type } = toRefs(props)
</script>
<template>
  <pre
    class="preview-code-wrapper font-extrabold line-numbers"
  ><code :class="'language-'+ type" v-html="Prism.highlight(code, Prism.languages[type], type)"></code></pre>
</template>
<style lang="scss" scoped>
.preview-code-wrapper {
  margin: 0;
  border-radius: 0;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
