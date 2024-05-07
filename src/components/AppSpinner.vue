<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AppSpinner"
})
</script>

<template>
  <div
      class="absolute -right-1/3 top-2
      w-8 h-8 flex justify-center items-center
      text-[2.5rem] text-primary
      animate-spin"
  >
    <i class="fa-solid fa-spinner"></i>
  </div>
</template>