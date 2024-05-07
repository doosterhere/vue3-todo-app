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
        <i class="fa-solid fa-check text-done"></i>
        Save
      </BaseButton>
      <BaseButton @click="cancelEditTodo" class="flex-shrink flex-grow flex-auto">
        <i class="fa-solid fa-ban text-danger"></i>
        Cancel
      </BaseButton>
    </div>
  </form>
</template>