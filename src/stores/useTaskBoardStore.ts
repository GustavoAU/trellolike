import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Column } from '@/types'

export const useTaskBoard = defineStore('TaskBoard', () => {

  const columns = ref<Column[]>([])

  const getColumns = computed(() => columns.value)

  const addColumn = (column: Column) => {
    columns.value = [...columns.value, column]
  }

    const removeColumn = (columnId: string) => {
      const newColumns = columns.value.filter((column) => column.id !== columnId)
      columns.value = newColumns
    };

  return {
    columns,
    getColumns,
    addColumn,
    removeColumn
  }
})
