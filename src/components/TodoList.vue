<script lang="ts">
import {defineComponent, type PropType} from 'vue';

import type {Todo} from '@/types/Todo';

import TodoListItem from '@/components/TodoListItem.vue';

export default defineComponent({
  name: 'TodoList',
  components: {TodoListItem},
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true
    }
  },
  methods: {
    toggleTodo(id: number) {
      this.$emit('toggle-todo', id)
    }
  },
  emits: {
    'toggle-todo': (id: number) => Number.isInteger(id)
  }
});
</script>

<template>
  <ul class="todo-list">
    <TodoListItem
        v-for="todo in todos"
        @toggle-todo="toggleTodo(todo.id)"
        :todo="todo"
        :key="todo.id"
        :class="{ 'todo-item_done': todo.completed }"
    />
  </ul>
</template>

<style scoped lang="scss">
.todo-list {
  margin: 0;
  padding: 0;

  list-style: none;
}
</style>
