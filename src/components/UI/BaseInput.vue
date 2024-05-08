<script lang="ts">
import {defineComponent} from 'vue';

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
  },
  methods: {
    updateInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('update:modelValue', target.value);
    }
  }
});
</script>

<template>
  <input
      :type
      :placeholder
      :value="modelValue"
      @input="updateInput"
      class="w-full py-4 px-6 border border-solid border-lightgray rounded-lg box-border
      text-2xl font-[inherit] text-[inherit] dark:text-slate-300
      bg-white dark:bg-slate-500
      outline-0"
  >
</template>