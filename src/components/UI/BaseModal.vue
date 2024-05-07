<script lang="ts">
import {defineComponent} from 'vue';

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
      class="fixed top-0 right-0 bottom-0 left-0 z-50
      flex
      bg-black bg-opacity-50"
  >
    <div
        @click.stop
        class="m-auto p-8 min-w-[320px] sm:min-w-[480px] rounded-lg
        bg-white"
    >
      <slot></slot>
    </div>
  </div>
</template>