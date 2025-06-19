import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Column } from '@/types'

export const useTaskBoard = defineStore('TaskBoard', () => {

  const columns = ref<Column[]>([])

  const getColumns = computed(() => columns.value)

  const addColumn = (column: Column) => {
    columns.value = [...columns.value, column]
  }



  return {
    columns,
    getColumns,
    addColumn,
  }
})
