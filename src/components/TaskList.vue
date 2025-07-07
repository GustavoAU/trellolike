<script setup lang="ts">
import { computed } from 'vue'
import AddTaskForm from './AddTaskForm.vue'
import SingleTask from './SingleTask.vue'
import { useTaskBoard } from '../stores/useTaskBoardStore'
import draggable from 'vuedraggable'


const props = defineProps<{ columnId: string }>()

const taskBoardStore = useTaskBoard()
const tasks = computed({
  get: () => taskBoardStore.tasks[props.columnId] || [],
  set: (newTasks) => {
    taskBoardStore.tasks[props.columnId] = newTasks
  }

})

const handleRemoveTask = (task: { id: string, title: string, assignee: string, comment: string }): void => {
  taskBoardStore.removeTask({ columnId: props.columnId, task })
}
</script>

<template>
  <div class="TaskList mt-4">
    <draggable
      v-model="tasks"
      :group="{ name: 'tasks', pull: true, put: true }"
      class="task-list"
      item-key="id"
      tag="div"
    >
      <template #item="{ element }">
        <SingleTask :task="element" @removeTask="handleRemoveTask" />
      </template>
    </draggable>

    <AddTaskForm :columnId="props.columnId" />

  </div>
</template>



