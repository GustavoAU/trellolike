import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Column, Task } from '@/types'

export const useTaskBoard = defineStore('TaskBoard', () => {

  const columns = ref<Column[]>([])
  const tasks = ref<Record<string, Task[]>>({})

  const getColumns = computed(() => columns.value)

  const addColumn = (column: Column) => {
    columns.value = [...columns.value, column]
  }

  const removeColumn = (columnId: string) => {
    const newColumns = columns.value.filter((column) => column.id !== columnId)
    columns.value = newColumns
  }

  const addTask = ({ columnId, task }: { columnId: string; task: Task }) => {
    const newColumnTasks = [...(tasks.value[columnId] || []), task]
    tasks.value = { ...tasks.value, [columnId]: newColumnTasks }
  }

  return {
    columns,
    getColumns,
    addColumn,
    removeColumn,
    addTask
  }
})
