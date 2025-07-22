<script setup lang="ts">
import { ref, computed, onMounted,onUnmounted } from 'vue'
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

type EditEvents =
  | { type: 'editColumn'; payload: { title: string }}
  | { type: 'editTask'; title: string; assignee: string; comment: string }


const emit = defineEmits<{
  (e: 'editColumn', payload: { title: string }): void
  (e: 'editTask', title: string, assignee: string, comment: string): void
  (e: 'remove'): void
  (e: 'startEdit'): void
}>()

const props = defineProps<{
  title: string
  type: 'column' | 'task'
  isTaskEditing?: boolean
  task?: {
    title: string
    assignee?: string
    comment?: string
  }
}>()

const isEditing = ref<boolean>(false)
const editedTitle = ref<string>(props.title)

const toggleShowButtons = computed(() => {
if (props.type === 'column') {
    return isEditing.value
  }
  return props.isTaskEditing || false
})

const startEdit = (): void => {
  if (props.type === 'column'){
    isEditing.value = true
    editedTitle.value = props.title
  } else if (props.type === 'task') {
    emit('startEdit')
}
}

const saveEdit = (): void => {
  if (props.type === 'column') {
    const eventObj: Extract<EditEvents, { type: 'editColumn' }> = {
      type: 'editColumn',
      payload: { title: editedTitle.value }
    }
    emit(eventObj.type, eventObj.payload)
    isEditing.value = false
  }
}

const cancelEdit = (): void => {
  if(props.type === 'column') {
    isEditing.value = false
    editedTitle.value = props.title
  }
}

const handleGlobalEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isEditing.value && props.type === 'column') {
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
  <div class="ElementHeader">
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center gap-2">
        <template v-if="!isEditing">
          <h3
            class="text-gray-800 font-bold cursor-pointer ml-1 truncate"
            @dblclick="startEdit"
          >
            {{ props.title }}
          </h3>
        </template>
        <template v-else>
          <input
            v-model="editedTitle"
            placeholder="Enter title"
            class="bg-white border-1 border-blue-300 text-gray-800 rounded-xl focus:outline-blue-500 px-2 py-1 flex-1 min-w-0 font-bold"
            @keyup.enter="saveEdit"
            @keyup.escape="cancelEdit"
          />
        </template>
      </div>
      <div class="flex items-center gap-2">
        <template v-if="toggleShowButtons && props.type === 'column'">
          <button @click="saveEdit" class="cursor-pointer" title="Save">
            <CheckIcon class="w-5 h-5 text-green-600" />
          </button>
          <button @click="cancelEdit" class="cursor-pointer" title="Cancel">
            <XMarkIcon class="w-5 h-5 text-red-600" />
          </button>
        </template>
        <template v-else-if="!toggleShowButtons">
          <button @click="startEdit" class="cursor-pointer" title="Edit">
            <PencilIcon class="w-5 h-5" />
          </button>
          <button @click="$emit('remove')" class="cursor-pointer" title="Delete">
            <TrashIcon class="w-5 h-5" />
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
