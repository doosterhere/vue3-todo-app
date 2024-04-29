<script lang="ts">
import {defineComponent, type PropType} from 'vue';

import type {StatsType} from "@/types/StatsType";

export default defineComponent({
  name: 'AppHeader',
  props: {
    stats: {
      type: Object as PropType<StatsType>,
      required: true
    }
  },
  computed: {
    activeReport(): string {
      const active = this.stats?.active || 0;
      const thing = active > 1 ? 'things' : 'thing';
      return `${active} more ${thing} left to do`;
    },
    doneReport(): string {
      const done = this.stats?.done || 0;
      const thing = done > 1 ? 'things' : 'thing';
      return `${done} ${thing} done`;
    }
  }
})
</script>

<template>
  <header class="app-header">
    <h3 class="title">Todos list</h3>
    <div class="app-header__report">
      {{ activeReport }}, {{ doneReport }}
    </div>

    <BaseButton>
      Add new todo
    </BaseButton>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.app-header {
  position: sticky;
  top: 0;
  z-index: $z-index-header;

  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  background-color: white;

  .title {
    margin: 5px;
    font-size: 2.4rem;
    font-weight: 500;
    color: $color-primary
  }

  .app-header__report {
    font-size: 1.4rem;
    color: gray;
  }
}
</style>