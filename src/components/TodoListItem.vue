<script lang="ts">
import {defineComponent, type PropType} from 'vue';

import type {Todo} from '@/types/Todo';

export default defineComponent({
  name: 'TodoListItem',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  }
})
</script>

<template>
  <li
      class="todo-item"
  >
    <div class="todo-item__status">
      <i class="fa-solid fa-check"></i>
    </div>

    <span class="todo-item__text">{{ todo.title }}</span>

    <div class="todo-item__actions">
      <button
          class="todo-item__edit-button"
      >
        <i class="fa-regular fa-pen-to-square"></i>
      </button>

      <button
          class="todo-item__remove-button"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </li>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.todo-item {
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: 2.4rem 1fr 3.2rem;
  align-items: center;
  gap: 1.5rem;

  cursor: pointer;

  transition: box-shadow 0.2s;

  &:not(:last-child) {
    border-bottom: 1px solid $color-gray;
  }

  &.todo-item_done {
    .todo-item__text {
      text-decoration: line-through;
    }


    .todo-item__status {
      opacity: 1;

      .fa-check {
        display: block;
      }
    }
  }

  &:hover {
    box-shadow: 0 1px 20px rgb(240 240 240 / 80%);

    .todo-item__actions {
      .todo-item__remove-button,
      .todo-item__edit-button {
        opacity: 1;
      }
    }
  }

  .todo-item__status {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 2.4rem;

    opacity: 0;

    transition: opacity 0.2s;

    .fa-check {
      position: relative;
      top: 0.1rem;

      color: $color-done;
    }
  }

  .todo-item__text {
    font-weight: 400;
  }

  .todo-item__actions {
    display: flex;
    gap: 10px;

    .todo-item__edit-button,
    .todo-item__remove-button {
      padding: 0;
      font: inherit;
      background-color: transparent;
      border: none;

      color: $color-secondary;

      opacity: 0;

      transition: opacity 0.2s;

      &:hover {
        color: $color-primary;

        cursor: inherit;
      }
    }
  }
}
</style>
