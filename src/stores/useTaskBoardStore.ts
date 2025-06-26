import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTaskBoard = defineStore('TaskBoard', () => {

  type Task = {
  id: string
  title: string
  assignee: string
  comment: string
}
  type Column = {
    id: string
    title: string
  }


  const columns = ref<Column[]>([])
  const tasks = ref<Record<string, Task[]>>({})

  const getColumns = computed(() => columns.value)

  const addColumn = (column: Column): void => {
    columns.value = [...columns.value, column]
  }

  const removeColumn = (columnId: string): void => {
    const newColumns = columns.value.filter((column) => column.id !== columnId)
    columns.value = newColumns
    const { [columnId]: removed, ...rest } = tasks.value
    tasks.value = { ...rest }
  }

  const addTask = ({ columnId, task }: { columnId: string; task: Task }): void => {
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
