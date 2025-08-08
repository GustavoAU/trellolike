<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { PencilIcon } from '@heroicons/vue/24/outline'
import ModalLayout from './ModalLayout.vue'
import AddButton from './CustomButton.vue'
import DynamicInput from './DynamicInput.vue'

const props = defineProps<{
  title: string
  task?: {
    id: string
    title: string
    assignee: string
    comment: string
  }
  isOpen: boolean
  variant: 'column' | 'task'
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'editColumn', payload: { title: string }): void
  (e: 'editTask', payload: { title: string; assignee: string; comment: string }): void
  (e: 'remove'): void
}>()

const isModalOpen = ref<boolean>(false)
const editedTitle = ref<string>(props.title)
const editedAssignee = ref<string>(props.task?.assignee || '')
const editedComment = ref<string>(props.task?.comment || '')
const isError = ref({} as Record<string, boolean>)

const isErrorColumn = () => {
  const titleError = editedTitle.value.trim().length === 0
  isError.value = {
    editedTitle: titleError,
  }
  return titleError
}

const isErrorTask = () => {
  const titleError = editedTitle.value.trim().length === 0
  const assigneeError = editedAssignee.value.trim().length === 0
  const commentError = editedComment.value.trim().length === 0

  isError.value = {
    editedTitle: titleError,
    editedAssignee: assigneeError,
    editedComment: commentError,
  }

  return titleError || assigneeError || commentError
}

const isInputInvalid = (): boolean => {
  return props.variant === 'column' ? isErrorColumn() : isErrorTask()
}

const startEdit = (): void => {
  editedTitle.value = props.title
  editedAssignee.value = props.task?.assignee || ''
  editedComment.value = props.task?.comment || ''

  isError.value =
    props.variant === 'column'
      ? { editedTitle: false }
      : {
          editedTitle: false,
          editedAssignee: false,
          editedComment: false,
        }
  isModalOpen.value = true
}

const closeModal = (): void => {
  isModalOpen.value = false
}

const handleSave = (): void => {
  if (isInputInvalid()) {
    return
  }

  if (props.variant === 'column') {
    emit('editColumn', { title: editedTitle.value })
  } else if (props.variant === 'task') {
    emit('editTask', {
      title: editedTitle.value,
      assignee: editedAssignee.value,
      comment: editedComment.value,
    })
  }
  isModalOpen.value = false
}
</script>

<template>
  <div class="ElementHeader">
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-2">
        <h3 class="text-gray-800 font-bold cursor-pointer ml-1 truncate">
          {{ title }}
        </h3>
      </div>

      <div class="flex items-center gap-2">
        <div>
          <button @click="startEdit" class="cursor-pointer">
            <PencilIcon class="w-5 h-5" />
          </button>

          <ModalLayout :isOpen="isModalOpen" @close="closeModal" @keyup.escape="closeModal">
            <template #default>
              <div class="flex flex-col gap-2 p-4">
                <div v-if="variant === 'column'">
                  <h2 class="mb-2 text-xl font-semibold">Edit Column Here</h2>
                  <DynamicInput
                    v-model="editedTitle"
                    :isError="isError.editedTitle"
                    placeholder="edit title"
                    errorMessage="Please fill out this field."
                    @focus="editedTitle = ''"
                  />
                </div>
                <div v-else-if="variant === 'task'" class="relative">
                  <h2 class="mb-2 text-xl font-semibold">Edit Task Here</h2>
                  <DynamicInput
                    v-model="editedTitle"
                    :isError="isError.editedTitle"
                    placeholder="edit title"
                    errorMessage="Please fill out this field."
                    @focus="editedTitle = ''"
                  />
                  <DynamicInput
                    v-model="editedAssignee"
                    :isError="isError.editedAssignee"
                    placeholder="edit assignee"
                    errorMessage="Please fill out this field."
                  />
                  <DynamicInput
                    v-model="editedComment"
                    :isError="isError.editedComment"
                    placeholder="edit comment"
                    errorMessage="Please fill out this field."
                    variant="textarea"
                  />
                </div>
                <div class="flex gap-2 justify-between">
                  <AddButton variant="outline" @click="closeModal"> Cancel </AddButton>
                  <AddButton @click="handleSave"> Save </AddButton>
                </div>
              </div>
            </template>
          </ModalLayout>
        </div>
        <button @click="$emit('remove')" title="Delete">
          <TrashIcon class="w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </div>
  </div>
</template>
