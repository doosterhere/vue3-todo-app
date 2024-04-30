<script lang="ts">
import {defineComponent} from 'vue';

import axios from "axios";

import type {Todo} from "@/types/Todo";
import {FilterType} from "@/types/FilterType";

import AppHeader from "@/components/AppHeader.vue";
import TodoList from "@/components/TodoList.vue";
import FormAddTodo from "@/components/FormAddTodo.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import FormEditTodo from "@/components/FormEditTodo.vue";
import AppFooter from "@/components/AppFooter.vue";

interface State {
  todos: Todo[],
  page: number,
  totalPages: number,
  limit: number,
  isTodoLoading: boolean,
  activeFilter: FilterType,
  isModalVisible: boolean,
  modalWithAdd: boolean,
  editedId: number,
  confirmationTitle: string,
  modalWithConfirm: boolean,
  modalWithEdit: boolean,
  observer: IntersectionObserver | null
}

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    TodoList,
    FormAddTodo,
    ConfirmationDialog,
    FormEditTodo,
    AppFooter
  },
  data(): State {
    return {
      todos: [],
      page: 1,
      totalPages: 0,
      limit: 10,
      isTodoLoading: false,
      activeFilter: FilterType.All,
      isModalVisible: false,
      modalWithAdd: false,
      editedId: 0,
      confirmationTitle: 'Are you sure?',
      modalWithConfirm: false,
      modalWithEdit: false,
      observer: null
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
      this.activeFilter = filter;
    },
    async toggleTodo(id: number): Promise<void> {
      try {
        const completed = this.todos.find((todo) => todo.id === id)!.completed;
        this.isTodoLoading = true;
        const response = await axios(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'PATCH',
          data: {
            completed: !completed
          }
        });

        if (response.status === 200) {
          this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }

            return todo;
          })
        }
      } catch {
        alert('Error while toggling todo');
      } finally {
        this.isTodoLoading = false;
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    showAddTodoDialog() {
      this.modalWithAdd = true;
      this.showModal();
    },
    hideModal() {
      this.isModalVisible = false;
      this.modalWithAdd = false;
      this.modalWithConfirm = false;
      this.modalWithEdit = false;
    },
    async addTodo(todo: Partial<Todo>): Promise<void> {
      try {
        this.isTodoLoading = true;
        const response = await axios('https://jsonplaceholder.typicode.com/todos', {
          method: 'POST',
          data: todo
        });

        if (response.status === 201) {
          this.todos = [response.data as Todo, ...this.todos];
        }
      } catch {
        alert('Error while adding todo');
      } finally {
        this.isTodoLoading = false;
        this.hideModal();
      }
    },
    showRemoveTodoDialog(id: number) {
      this.editedId = id;
      this.confirmationTitle = 'Are you sure you want to remove this todo?';
      this.modalWithConfirm = true;
      this.showModal();
    },
    async removeTodo(id: number): Promise<void> {
      try {
        this.isTodoLoading = true;
        const response = await axios(`https://jsonplaceholder.typicode.com/todos/${id}`, {
          method: 'DELETE'
        });

        if (response.status === 200) {
          this.todos = this.todos.filter((todo) => todo.id !== id);
        }
      } catch {
        alert('Error while removing todo');
      } finally {
        this.isTodoLoading = false;
        this.hideModal();
      }
    },
    showEditTodoDialog(id: number) {
      this.editedId = id;
      this.modalWithEdit = true;
      this.showModal();
    },
    async editTodo(editedTodo: Todo): Promise<void> {
      try {
        this.isTodoLoading = true;
        const response = await axios(`https://jsonplaceholder.typicode.com/todos/${editedTodo.id}`, {
          method: 'PATCH',
          data: {
            title: editedTodo.title
          }
        });

        if (response.status === 200) {
          this.todos = this.todos.map(todo => {
            if (todo.id === editedTodo.id) {
              todo.title = editedTodo.title;
            }

            return todo;
          });
        }
      } catch {
        alert('Error while editing todo');
      } finally {
        this.isTodoLoading = false;
        this.hideModal();
      }
    },
    handleIntersect(entries: IntersectionObserverEntry[]) {
      entries.forEach(({isIntersecting}) => {
        if (isIntersecting && (this.page < this.totalPages || this.totalPages === 0)) {
          console.log('intersecting');
        }
      })
    },
    startObserving() {
      this.observer = new IntersectionObserver(
          this.handleIntersect,
          {
            rootMargin: '0px',
            threshold: 1.0
          }
      );

      const observerRef = this.$refs.observer as { $el: HTMLElement };
      const observeElement = observerRef.$el as HTMLElement;
      this.observer.observe(observeElement);
    }
  },
  mounted() {
    this.fetchTodos();
    this.startObserving();
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
});
</script>

<template>
  <AppHeader
      :stats
      :active-filter="activeFilter"
      @change-filter="changeFilter"
      @show-add-todo-dialog="showAddTodoDialog"
  />

  <TodoList
      @toggle-todo="toggleTodo"
      @show-remove-dialog="showRemoveTodoDialog"
      @show-edit-dialog="showEditTodoDialog"
      :todos="filteredTodos"
  />

  <AppFooter ref="observer"/>

  <BaseModal
      v-model:is-visible="isModalVisible"
  >
    <FormAddTodo
        v-if="modalWithAdd"
        @add-todo="addTodo"
        @cancel-add-todo="hideModal"
    />

    <FormEditTodo
        :todo="todos.find(todo => todo.id === editedId)"
        v-if="modalWithEdit"
        @edit-todo="editTodo"
        @cancel-edit-todo="hideModal"
    />

    <ConfirmationDialog
        :title="confirmationTitle"
        v-if="modalWithConfirm"
        @confirm-yes="removeTodo(editedId)"
        @confirm-no="hideModal"
    />
  </BaseModal>
</template>

<style scoped lang="scss">

</style>