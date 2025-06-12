import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Column } from '@/types'

export const useTaskBoard = defineStore('TaskBoard', () => {

  const columns = ref<Column[]>([])

  const columnList = computed(() => columns.value)

  const addColumn = (column: Column) => {
    columns.value = [...columns.value, column]
  }

  return {
    columns,
    columnList,
    addColumn
  }
})
