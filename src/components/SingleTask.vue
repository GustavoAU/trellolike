<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ElementHeader from './ElementHeader.vue'
import ConfirmationBox from './ConfirmationBox.vue'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useTaskBoard } from '@/stores/useTaskBoardStore'

const emit = defineEmits<{
  (e: 'removeTask', task: { id: string, title: string, assignee: string, comment: string }): void
  (e: 'editStart'): void
  (e: 'editEnd'): void
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
const isEditing = ref(false)
const editedTitle = ref(props.task.title)
const editedAssignee = ref(props.task.assignee)
const editedComment = ref(props.task.comment)


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

const startEdit = (): void => {
  isEditing.value = true
  editedTitle.value = props.task.title
  editedAssignee.value = props.task.assignee
  editedComment.value = props.task.comment
  emit('editStart')
}

const saveEdit = (): void => {
  taskBoardStore.editTask(props.columnId, props.task.id, {
    id: props.task.id,
    title: editedTitle.value,
    assignee: editedAssignee.value,
    comment: editedComment.value
  })
  emit('editEnd')
}

const cancelEdit = (): void => {
  isEditing.value = false
  editedTitle.value = props.task.title
  editedAssignee.value = props.task.assignee
  editedComment.value = props.task.comment
  emit('editEnd')
}
const handleGlobalEscape = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && isEditing.value) {
    event.preventDefault()
    event.stopPropagation()
    cancelEdit()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleGlobalEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalEscape)
})
</script>

<template>
  <div
    class="SingleTask text-gray-800 w-full bg-primary-dark p-2 mb-10 mt-6 rounded-xl shadow-md transform hover:shadow-lg transition duration-300 ease-in-out"
  >
    <ElementHeader
      :type="'task'"
      :title="props.task.title"
      :isTaskEditing="isEditing"
      @remove="handleRemoveRequest"
      @startEdit="startEdit"
      @saveEdit="saveEdit"
    />

    <div v-if="isEditing" class="mt-3 space-y-3">

      <div>
        <input
          v-model="editedTitle"
          class="w-full bg-white border-1 border-blue-300 text-gray-800 rounded-xl focus:outline-blue-500 px-3 py-2 font-bold"
          @keyup.enter="saveEdit"
          @keyup.escape="cancelEdit"
        />
      </div>
      <div class="flex items-center gap-2 w-fit">
        <span class="text-sm text-gray-600 flex-shrink-0 w-fit">Assignee:</span>
        <input
          v-model="editedAssignee"
          placeholder="Enter assignee"
          class="flex-1  bg-white border-1 border-blue-300 text-gray-800 rounded-xl focus:outline-blue-500 px-3 py-2"
          @keyup.enter="saveEdit"
          @keyup.escape="cancelEdit"
        />
      </div>
      <div class="flex items-start gap-2">
        <span class="text-sm text-gray-600 w-20 flex-shrink-0 pt-2">Comment:</span>
        <textarea
          v-model="editedComment"
          placeholder="Enter comment"
          class="flex-1 bg-white border-1 border-blue-300 text-gray-800 rounded-xl focus:outline-blue-500 px-3 py-2 resize-none"
          @keyup.enter="saveEdit"
          @keyup.escape="cancelEdit"
        />
      </div>

      <div class="flex justify-end gap-2">
        <button @click="saveEdit" class="cursor-pointer" title="Save">
          <CheckIcon class="w-5 h-5 text-green-600" />
        </button>
        <button @click="cancelEdit" class="cursor-pointer" title="Cancel">
          <XMarkIcon class="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
    <div v-else class="mt-2 space-y-1">
      <p class="text-sm"><span class="font-medium">Assignee:</span> {{ task.assignee }}</p>
      <p class="text-sm"><span class="font-medium">Comment:</span> {{ task.comment }}</p>
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
