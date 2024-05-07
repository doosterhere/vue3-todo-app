<script lang="ts">
import {defineComponent, type PropType} from 'vue';

import type {Todo} from '@/types/Todo';

interface State {
  newTodoTitle: string
}

export default defineComponent({
  name: 'FormEditTodo',
  props: {
    todo: {
      type: Object as PropType<Todo> | PropType<undefined>,
      required: true
    }
  },
  data(): State {
    return {
      newTodoTitle: ''
    };
  },
  methods: {
    editTodo() {
      const newTodo = {
        ...this.todo,
        title: this.newTodoTitle || 'edited todo title'
      };
      this.$emit('edit-todo', newTodo);
      this.newTodoTitle = '';
    },
    cancelEditTodo() {
      this.$emit('cancel-edit-todo');
    }
  },
  mounted() {
    if (typeof this.todo === 'undefined') {
      this.cancelEditTodo();
      return;
    }

    this.newTodoTitle = this.todo.title;

    const input = (this.$refs.inputRef as { $el: HTMLInputElement }).$el;
    input.focus();
  },
  emits: ['edit-todo', 'cancel-edit-todo']
});
</script>

<template>
  <form
      @submit.prevent
      class="flex flex-col gap-6"
  >
    <BaseInput
        placeholder="Edit todo title"
        v-model="newTodoTitle"
        ref="inputRef"
    />
    <div class="flex gap-6">
      <BaseButton @click="editTodo" class="flex-shrink flex-grow flex-auto">
        <!--        <i class="fa-solid fa-check text-done"></i>-->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-8 h-8 text-done">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
        </svg>
        Save
      </BaseButton>
      <BaseButton @click="cancelEditTodo" class="flex-shrink flex-grow flex-auto">
        <!--        <i class="fa-solid fa-ban text-danger"></i>-->
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