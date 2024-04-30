<script lang="ts">
import {defineComponent, type PropType} from 'vue';

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
@import '@/assets/variables.scss';

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

  &.button_primary {
    color: $color-primary;
    border: 2px solid $color-primary;
  }

  &:active {
    transform: scale(0.98);
  }

  &:not(.button_primary):hover {
    font-weight: 500;
  }
}
</style>