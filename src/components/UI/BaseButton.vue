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
      class="py-2 px-3.5 flex justify-center items-center gap-4 border border-lightgray rounded-lg
      font-[inherit] text-[inherit] dark:text-slate-300
      bg-transparent
      cursor-pointer
      active:scale-95
      hover:font-medium"
  >
    <slot></slot>
  </button>
</template>