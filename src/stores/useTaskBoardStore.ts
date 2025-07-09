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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [columnId]: _, ...rest } = tasks.value
    tasks.value = { ...rest }
  }

const addTask = ({ columnId, task }: { columnId: string; task: Task }): void => {
  const newColumnTasks = [...(tasks.value[columnId] || []), task]
  tasks.value = { ...tasks.value, [columnId]: newColumnTasks }
  }

const removeTask = ({columnId,task}: { columnId: string; task: Task }): void => {
  const newColumnsTasks = tasks.value[columnId].filter(taskItem => taskItem.id !== task.id)
  tasks.value = { ...tasks.value, [columnId]: newColumnsTasks }
  }

const editColumn = (columnID: string, updatedColumn: Column): void => {
    const columnIndex = columns.value.findIndex(col => col.id === columnID)
    if (columnIndex !== -1) {
      columns.value[columnIndex] = { ...updatedColumn }
    }
  }



  return {
    columns,
    getColumns,
    addColumn,
    removeColumn,
    addTask,
    tasks,
    removeTask,
    editColumn
  }


})
