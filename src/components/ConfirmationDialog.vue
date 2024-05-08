<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ConfirmationDialog',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    handleYes() {
      this.$emit('confirm-yes');
    },
    handleNo() {
      this.$emit('confirm-no');
    }
  }
});
</script>

<template>
  <div class="confirmation-dialog">
    <h4 class="mb-4
    font-medium text-center text-[inherit] dark:text-slate-300"
    >
      {{ title }}
    </h4>
    <div class="flex gap-4">
      <BaseButton @click="handleYes" class="flex-shrink flex-grow flex-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-8 h-8 text-done">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
        </svg>
        Yes
      </BaseButton>
      <BaseButton @click="handleNo" class="flex-shrink flex-grow flex-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-8 h-8 text-danger">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/>
        </svg>
        No. Go back
      </BaseButton>
    </div>
  </div>
</template>