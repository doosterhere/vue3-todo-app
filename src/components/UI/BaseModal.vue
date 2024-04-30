<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:isVisible', false);
      this.$emit('close');
    }
  }
});
</script>

<template>
  <div
    v-if="isVisible"
    @click="hideModal"
    class="modal"
  >
    <div
      @click.stop
      class="modal__content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $z-index-modal;

  display: flex;

  background: rgba(0, 0, 0, 0.5);

  .modal__content {
    margin: auto;
    padding: 20px;
    min-width: 320px;
    border-radius: 10px;

    background-color: white;
  }
}
</style>