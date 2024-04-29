<script lang="ts">
import {defineComponent, type PropType} from 'vue';

import {FilterType} from '@/types/FilterType';

interface State {
  filters: FilterType[]
}

export default defineComponent({
  name: 'TodoFilters',
  props: {
    activeFilter: {
      type: String as PropType<FilterType>,
      required: true
    }
  },
  data(): State {
    return {
      filters: [
        FilterType.All,
        FilterType.Active,
        FilterType.Done
      ]
    }
  },
  methods: {
    changeFilter(filter: FilterType) {
      this.$emit('change-filter', filter)
    }
  },
  emits: {
    'change-filter': (filter: FilterType) => filter
  }
});
</script>

<template>
  <section class="app-filters">
    <section class="toggle-group">
      <BaseButton
          v-for="filter in filters"
          :key="filter"
          :class="{'button_primary': activeFilter === filter}"
          @click="changeFilter(filter)"
      >
        {{ filter }}
      </BaseButton>
    </section>
  </section>
</template>

<style scoped lang="scss">
@import '@/assets/variables';

.app-filters {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .toggle-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    box-sizing: border-box;
    border: 0.1rem solid $color-light;
    border-radius: 1.6rem;

    button:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    button:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    button:nth-child(2) {
      border-left: none;
      border-right: none;
    }

    button.button_primary {
      border: 2px solid $color-primary;

      font-weight: 450;
    }

    button.button_primary + button.base-button {
      border-left-color: transparent;
    }

    button.base-button:has(+ button.button_primary) {
      border-right-color: transparent;
    }
  }
}
</style>