<script lang="ts">
import {defineComponent, type PropType} from 'vue'

export default defineComponent({
  name: "BaseButton",
  props: {
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'> | undefined,
      default: 'button'
    }
  }
})
</script>

<template>
  <button
      :type
      class="base-button"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  font: inherit;

  background-color: transparent;
  cursor: pointer;
}
</style>