<script setup lang="ts">
import { computed } from 'vue'
import AddTaskForm from './AddTaskForm.vue'
import SingleTask from './SingleTask.vue'
import { useTaskBoard } from '../stores/useTaskBoardStore'


const props = defineProps<{ columnId: string }>()

const taskBoardStore = useTaskBoard()
const tasks = computed(() => taskBoardStore.tasks[props.columnId] || [])
</script>

<template>
  <div class="TaskList mt-4">
    <SingleTask v-for="task in tasks" :key="task.id" :task="task" />
    <AddTaskForm  :columnId="props.columnId" />
  </div>
</template>



