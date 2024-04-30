<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import type { Todo } from '@/types/Todo';

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
  },
  emits: ['edit-todo', 'cancel-edit-todo']
});
</script>

<template>
  <form
    @submit.prevent
    class="form-todo"
  >
    <BaseInput
      placeholder="Edit todo title"
      v-model="newTodoTitle"
    />
    <div class="form-todo__actions">
      <BaseButton @click="editTodo">
        <i class="fa-solid fa-check"></i>
        Save
      </BaseButton>
      <BaseButton @click="cancelEditTodo">
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