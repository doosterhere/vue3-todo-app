<script lang="ts">
import {defineComponent, type PropType} from 'vue';

import type {Todo} from '@/types/Todo';
import BaseButton from "@/components/UI/BaseButton.vue";

export default defineComponent({
  name: 'TodoListItem',
  components: {BaseButton},
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  methods: {
    toggleTodo() {
      this.$emit('toggle-todo', this.todo.id);
    },
    showRemoveDialog() {
      this.$emit('show-remove-dialog', this.todo.id);
    },
    showEditDialog() {
      this.$emit('show-edit-dialog', this.todo.id);
    }
  },
  emits: {
    'toggle-todo': (id: number) => Number.isInteger(id),
    'show-remove-dialog': (id: number) => Number.isInteger(id),
    'show-edit-dialog': (id: number) => Number.isInteger(id)
  }
});
</script>

<template>
  <li
      @click="toggleTodo"
      class="py-6 px-8 grid grid-cols-todo items-center gap-6
      cursor-pointer
      transition-all duration-200
      hover:shadow
      not-last-child:border-b not-last-child:border-lightgray"
  >
    <div
        :class="{ 'opacity-0': !todo.completed }"
        class="w-10 h-10 flex justify-center items-center
        text-4xl
        transition-all duration-200"
    >
      <i class="fa-solid fa-check text-done"></i>
    </div>

    <span
        :class="{ 'line-through' : todo.completed }"
        class="font-normal"
    >
      {{ todo.id }}. {{ todo.title }}
    </span>

    <div class="flex gap-6">
      <BaseButton
          @click.stop="showEditDialog"
          class="font-[inherit] bg-transparent border-none button_small"
      >
        <i class="fa-regular fa-pen-to-square text-neutral-200 hover:text-done"></i>
      </BaseButton>

      <BaseButton
          @click.stop="showRemoveDialog"
          class="font-[inherit] bg-transparent border-none button_small"
      >
        <i class="fa-solid fa-trash text-neutral-200 hover:text-danger"></i>
      </BaseButton>
    </div>
  </li>
</template>
