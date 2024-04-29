<script lang="ts">
import {defineComponent} from 'vue';

import axios from "axios";

import type {Todo} from "@/types/Todo";
import {FilterType} from "@/types/FilterType";

import AppHeader from "@/components/AppHeader.vue";
import TodoList from "@/components/TodoList.vue";

interface State {
  todos: Todo[],
  page: number,
  totalPages: number,
  limit: number,
  isTodoLoading: boolean,
  activeFilter: FilterType
}

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    TodoList
  },
  data(): State {
    return {
      todos: [],
      page: 1,
      totalPages: 0,
      limit: 10,
      isTodoLoading: false,
      activeFilter: FilterType.All,
    }
  },
  computed: {
    activeTodos(): Todo[] {
      return this.todos.filter(todo => !todo.completed);
    },
    doneTodos(): Todo[] {
      return this.todos.filter(todo => todo.completed);
    },
    stats() {
      return {
        active: this.activeTodos.length,
        done: this.doneTodos.length
      }
    },
    filteredTodos(): Todo[] {
      switch (this.activeFilter) {
        case FilterType.Active:
          return this.activeTodos
        case FilterType.Done:
          return this.doneTodos
        case FilterType.All:
        default:
          return this.todos
      }
    },
  },
  methods: {
    async fetchTodos(): Promise<void> {
      try {
        this.isTodoLoading = true;
        const response = await axios('https://jsonplaceholder.typicode.com/todos', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.todos = response.data;
      } catch {
        alert('Error while loading todos');
      } finally {
        this.isTodoLoading = false;
      }
    },
    changeFilter(filter: FilterType) {
      this.activeFilter = filter
    },
  },
  mounted() {
    this.fetchTodos();
  },
});
</script>

<template>
  <AppHeader
      :stats
      :active-filter="activeFilter"
      @change-filter="changeFilter"
  />

  <TodoList
      :todos="filteredTodos"
  />
</template>

<style scoped lang="scss">

</style>