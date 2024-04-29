<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseInput',
  props: {
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [String, Number]
    }
  }
})
</script>

<template>
  <input
    :type
    :placeholder
    :value="modelValue"
    class="base-input"
  >
</template>

<style scoped lang="scss">
.base-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  font-size: 1.6rem;
  font-family: inherit;

  outline: none;
}
</style>