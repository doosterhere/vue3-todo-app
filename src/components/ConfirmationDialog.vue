<script lang="ts">
import { defineComponent } from 'vue';

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
    <h4>{{ title }}</h4>
    <div class="confirmation-dialog__actions">
      <BaseButton @click="handleYes">
        <i class="fa-solid fa-check"></i>
        Yes
      </BaseButton>
      <BaseButton @click="handleNo">
        <i class="fa-solid fa-ban"></i>
        No. Go back
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirmation-dialog {
  h4 {
    font-weight: 500;
    text-align: center;
  }

  .confirmation-dialog__actions {
    display: flex;
    gap: 10px;

    .base-button {
      flex: 1 1 auto;
    }
  }
}
</style>