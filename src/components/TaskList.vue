<script setup lang="ts">
import { ref, computed } from 'vue'
import AddTaskForm from './AddTaskForm.vue'
import SingleTask from './SingleTask.vue'
import { useTaskBoard } from '../stores/useTaskBoardStore'
import draggable from 'vuedraggable'


const props = defineProps<{
  columnId: string
  }>()

const taskBoardStore = useTaskBoard()
const editingTasks = ref<Set<string>>(new Set())


const tasks = computed({
  get: () => taskBoardStore.tasks[props.columnId] || [],
  set: (newTasks) => {
    taskBoardStore.tasks[props.columnId] = newTasks
  }
})
const hasTasksClass = computed(() =>{
return tasks.value.length > 0 ? 'mt-20' : 'mt-0'
})

const isAnyTaskEditing = computed(() => editingTasks.value.size > 0)
const handleRemoveTask = (task: { id: string, title: string, assignee: string, comment: string }): void => {
  taskBoardStore.removeTask({ columnId: props.columnId, task })
}

const handleTaskEditStart = (taskId: string): void => {
  editingTasks.value.add(taskId)
}

const handleTaskEditEnd = (taskId: string): void => {
  editingTasks.value.delete(taskId)
}

</script>

<template>
  <div class="TaskList"  >
    <template v-if="!isAnyTaskEditing">

      <draggable
        v-model="tasks"
        :group="{ name: 'tasks', pull: true, put: true }"
        class="task-list"
        item-key="id"
        tag="div"
      >
        <template #item="{ element }">
          <SingleTask
          :task="element"
          :columnId="columnId"
          @editStart="handleTaskEditStart(element.id)"
          @editEnd="handleTaskEditEnd(element.id)"
          @removeTask="handleRemoveTask"
          />
        </template>
      </draggable>
    </template>
    <template v-else>
      <div class="task-list">
        <SingleTask
          v-for="element in tasks"
          :key="element.id"
          :task="element"
          :columnId="columnId"
          @removeTask="handleRemoveTask"
          @editStart="handleTaskEditStart(element.id)"
          @editEnd="handleTaskEditEnd(element.id)"
        />
      </div>
    </template>

    <AddTaskForm
      :columnId="props.columnId"
      :class= "hasTasksClass"
    />

  </div>
</template>



