<script lang="ts">
import {defineComponent, type PropType} from 'vue';

import type {StatsType} from "@/types/StatsType";
import type {FilterType} from "@/types/FilterType";

import TodoFilters from "@/components/TodoFilters.vue";
import AppSpinner from "@/components/AppSpinner.vue";

export default defineComponent({
  name: 'AppHeader',
  components: {AppSpinner, TodoFilters},
  props: {
    stats: {
      type: Object as PropType<StatsType>,
      required: true
    },
    activeFilter: {
      type: String as PropType<FilterType>,
      required: true
    },
    isLoading: {
      type: Boolean,
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
  },
  methods: {
    changeFilter(filter: FilterType) {
      this.$emit('change-filter', filter);
    },
    showAddTodoDialog() {
      this.$emit('show-add-todo-dialog');
    }
  },
  emits: ['change-filter', 'show-add-todo-dialog']
});
</script>

<template>
  <header class="app-header">
    <div class="title-block">
      <h3 class="title">
        Todos list
      </h3>
      <AppSpinner v-if="isLoading"/>
    </div>
    <div class="app-header__report">
      {{ activeReport }}, {{ doneReport }}
    </div>

    <TodoFilters
        :active-filter="activeFilter"
        @change-filter="changeFilter"
    />

    <BaseButton @click="showAddTodoDialog">
      <i class="fa-solid fa-plus"></i>
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

  .title-block {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      margin: 5px;
      font-size: 2.4rem;
      font-weight: 500;
      color: $color-primary
    }

    .spinner {
      position: absolute;
      left: 120%;
    }
  }


  .app-header__report {
    font-size: 1.4rem;
    color: gray;
  }
}
</style>