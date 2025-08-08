<script setup lang="ts">
import { ref } from 'vue'
import ElementHeader from './ElementHeader.vue'
import ConfirmationBox from './ConfirmationBox.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'

const emit = defineEmits<{
  (e: 'removeTask', task: { id: string; title: string; assignee: string; comment: string }): void
}>()

const props = defineProps<{
  columnId: string
  task: {
    id: string
    title: string
    assignee: string
    comment: string
  }
}>()

const taskBoardStore = useTaskBoard()
const isConfirmVisible = ref(false)

const confirmRemove = (): void => {
  emit('removeTask', props.task)
  isConfirmVisible.value = false
}

const cancelRemove = (): void => {
  isConfirmVisible.value = false
}
const handleRemoveRequest = (): void => {
  isConfirmVisible.value = true
}

const saveEdit = (payload: { title: string; assignee: string; comment: string }) => {
  taskBoardStore.editTask(props.columnId, props.task.id, {
    id: props.task.id,
    title: payload.title,
    assignee: payload.assignee,
    comment: payload.comment,
  })
}
</script>

<template>
  <div
    class="SingleTask text-gray-800 w-full bg-primary-dark p-2 mb-10 mt-6 rounded-xl shadow-md transform hover:shadow-lg transition duration-300 ease-in-out"
  >
    <ElementHeader
      :variant="'task'"
      :isOpen="false"
      :title="props.task.title"
      :task="props.task"
      @remove="handleRemoveRequest"
      @editTask="saveEdit"
    />
    <div class="mt-3 space-y-3">
      <p>Assignee: {{ task.assignee }}</p>
      <p>Comment: {{ task.comment }}</p>
    </div>

    <transition name="fade-scale" appear>
      <ConfirmationBox
        v-if="isConfirmVisible"
        title="Are you sure?"
        message="You are about to remove this task. Continue?"
        @confirm="confirmRemove"
        @cancel="cancelRemove"
      />
    </transition>
  </div>
</template>
