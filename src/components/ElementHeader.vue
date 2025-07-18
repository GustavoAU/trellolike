<script setup lang="ts">
import { ref } from 'vue'
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

type EditEvents =
  | {type: 'editColumn'; payload: { title: string }}
  | {type: 'editTask'; payload:{title: string, assignee:string, comment: string }}

const emit = defineEmits<{
  (e: 'editColumn', payload: { title: string }): void
  (e: 'editTask', payload: { title: string; assignee: string; comment: string }): void
  (e: 'remove'): void

  }>()

const props = defineProps<{
  title: string
  type: 'column' | 'task'
  task?: {
    title: string
    assignee?: string
    comment?: string
  }
}>()

const isEditing = ref<boolean>(false)
const editedTitle = ref<string>(props.title)
const editedAssignee = ref<string>(props.task?.assignee ?? '')
const editedComment = ref<string>(props.task?.comment ?? '')



const startEdit = ():void => {
  isEditing.value = true
  editedTitle.value = props.title
  if (props.type === 'task') {
    editedAssignee.value = props.task?.assignee ?? ''
    editedComment.value = props.task?.comment ?? ''
  }

}

const saveEdit = (): void => {
  if (props.type === 'column') {
    const eventObj: Extract<EditEvents, { type: 'editColumn' }> = {
      type: 'editColumn',
      payload: { title: editedTitle.value }
    }
    emit(eventObj.type, eventObj.payload)
  } else if (props.type === 'task') {
    const eventObj: Extract<EditEvents, { type: 'editTask' }> = {
      type: 'editTask',
      payload: {
        title: editedTitle.value,
        assignee: editedAssignee.value,
        comment: editedComment.value
      }
    }
    emit(eventObj.type, eventObj.payload)
  }

  isEditing.value = false
}

const cancelEdit = ():void => {
  isEditing.value = false
  editedTitle.value = props.title
}
</script>

<template>
  <div class="ElementHeader flex justify-between items-center">
    <div class="flex items-center gap-2">
      <template v-if="!isEditing">
        <h3
          class="text-gray-800 font-bold cursor-pointer ml-1"
          @dblclick="startEdit"
        >
          {{ props.title }}
        </h3>

      </template>
      <template v-else>
        <input
          v-model="editedTitle"
          id="column-title-input"
          name="column-title"
          class="bg-white border-1 border-blue-300 text-gray-800 rounded-xl focus:outline-blue-500 px-2 py-1"
          @keyup.enter="saveEdit"

        />
        <button @click="saveEdit" class="cursor-pointer" title="Save">
          <CheckIcon class="w-4" />
        </button>
        <button @click="cancelEdit" class="cursor-pointer" title="Cancel">
          <XMarkIcon class="w-4" />
        </button>
      </template>
    </div>
    <div class="flex items-center gap-2">
      <button v-if="!isEditing" @click="startEdit" class="cursor-pointer" title="Edit column">
        <PencilIcon class="w-4" />
      </button>
      <button v-if="!isEditing" @click="$emit('remove')" class="cursor-pointer" title="Delete column">
        <TrashIcon class="w-4" />
      </button>
    </div>
  </div>
</template>


