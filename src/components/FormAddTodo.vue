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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-8 h-8 text-done">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
        </svg>
        Add todo
      </BaseButton>
      <BaseButton @click="cancelAddTodo" class="flex-shrink flex-grow flex-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-8 h-8 text-danger">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/>
        </svg>
        Cancel
      </BaseButton>
    </div>
  </form>
</template>