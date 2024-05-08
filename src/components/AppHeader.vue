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
      return `${active} ${thing} need to do`;
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
  <header class="sticky top-0 z-10
                p-8 flex flex-col justify-center items-center gap-6
                bg-white dark:bg-slate-900">
    <div class="relative">
      <h3 class="m-0.5 text-4xl font-medium text-primary">
        Todos list
      </h3>
      <AppSpinner v-if="isLoading"/>
    </div>
    <div class="text-2xl text-gray">
      {{ activeReport }}, {{ doneReport }}
    </div>

    <TodoFilters
        :active-filter="activeFilter"
        @change-filter="changeFilter"
    />

    <BaseButton @click="showAddTodoDialog">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-8 h-8 text-primary">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
      Add new todo
    </BaseButton>
  </header>
</template>