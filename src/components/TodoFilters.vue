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
  <section class="w-full flex flex-col gap-6">
    <section class="grid grid-cols-3">
      <BaseButton
          v-for="filter in filters"
          :key="filter"
          :class="{
            'button_primary': activeFilter === filter,
            'even:border-x-0': activeFilter !== filter,
            'border-primary': activeFilter === filter
          }"
          @click="changeFilter(filter)"
          class="first:rounded-r-none last:rounded-l-none even:rounded-none"
      >
        {{ filter }}
      </BaseButton>
    </section>
  </section>
</template>