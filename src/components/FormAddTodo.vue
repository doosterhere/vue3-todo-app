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
  mounted() {
    const inputRef = this.$refs.inputRef as { $el: HTMLInputElement };
    inputRef.$el.focus();
  },
  emits: ['add-todo', 'cancel-add-todo']
});
</script>

<template>
  <form
      @submit.prevent
      class="flex flex-col gap-6"
  >
    <BaseInput
        v-model="newTodoTitle"
        placeholder="New todo title"
        ref="inputRef"
    />
    <div class="flex gap-6">
      <BaseButton @click="addTodo" class="flex-shrink flex-grow flex-auto">
        <i class="fa-solid fa-check text-done"></i>
        Add todo
      </BaseButton>
      <BaseButton @click="cancelAddTodo" class="flex-shrink flex-grow flex-auto">
        <i class="fa-solid fa-ban text-danger"></i>
        Cancel
      </BaseButton>
    </div>
  </form>
</template>