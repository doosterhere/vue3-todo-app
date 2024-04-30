<script lang="ts">
import {defineComponent} from 'vue';

import type {Todo} from '@/types/Todo';

interface State {
  newTodoTitle: string
}

export default defineComponent({
  name: 'FormAddTodo',
  data(): State {
    return {
      newTodoTitle: ''
    }
  },
  methods: {
    addTodo() {
      const newTodo: Partial<Todo> = {
        userId: 1,
        title: this.newTodoTitle || 'new todo',
        completed: false
      }
      this.$emit('add-todo', newTodo);
      this.newTodoTitle = '';
    },
    cancelAddTodo() {
      this.newTodoTitle = '';
      this.$emit('cancel-add-todo');
    }
  },
  emits: ['add-todo', 'cancel-add-todo']
});
</script>

<template>
  <form
      @submit.prevent
      class="form-todo"
  >
    <BaseInput
        v-model="newTodoTitle"
        placeholder="New todo title"
    />
    <div class="form-todo__actions">
      <BaseButton @click="addTodo">
        <i class="fa-solid fa-check"></i>
        Add todo
      </BaseButton>
      <BaseButton @click="cancelAddTodo">
        <i class="fa-solid fa-ban"></i>
        Cancel
      </BaseButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form-todo {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .form-todo__actions {
    display: flex;
    gap: 10px;

    button {
      flex: 1 1 auto;
    }
  }
}
</style>