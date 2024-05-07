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
    <h4 class="mb-4 font-medium text-center">{{ title }}</h4>
    <div class="flex gap-4">
      <BaseButton @click="handleYes" class="flex-shrink flex-grow flex-auto">
        <i class="fa-solid fa-check text-done"></i>
        Yes
      </BaseButton>
      <BaseButton @click="handleNo" class="flex-shrink flex-grow flex-auto">
        <i class="fa-solid fa-ban text-danger"></i>
        No. Go back
      </BaseButton>
    </div>
  </div>
</template>