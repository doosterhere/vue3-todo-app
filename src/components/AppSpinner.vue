<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AppSpinner"
})
</script>

<template>
  <div class="spinner">
    <i class="fa-solid fa-spinner"></i>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/variables";

.spinner {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;
  color: $color-primary;

  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>