<script setup lang="ts">
import { computed } from 'vue'
import AddTaskForm from './AddTaskForm.vue'
import SingleTask from './SingleTask.vue'
import { useTaskBoard } from '../stores/useTaskBoardStore'


const props = defineProps<{ columnId: string }>()

const taskBoardStore = useTaskBoard()
const tasks = computed(() => taskBoardStore.tasks[props.columnId] || [])

const handleRemoveTask = (task: { id: string, title: string, assignee: string, comment: string }): void => {
  taskBoardStore.removeTask({ columnId: props.columnId, task })
}
</script>

<template>
  <div class="TaskList mt-4">
    <SingleTask v-for="task in tasks" :key="task.id" :task="task" @removeTask="handleRemoveTask" />
    <AddTaskForm  :columnId="props.columnId" />
  </div>
</template>



