<script setup lang="ts">
import { ref } from 'vue'
import { PencilSquareIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  title: string
}>()
const emit = defineEmits(['remove', 'edit'])

const isEditing = ref(false)
const editedTitle = ref(props.title)


function startEdit() {
  isEditing.value = true
  editedTitle.value = props.title
}
function saveEdit() {
  emit('edit', editedTitle.value)
  isEditing.value = false
}
function cancelEdit() {
  isEditing.value = false
  editedTitle.value = props.title
}
</script>

<template>
  <div class="ElementHeader flex justify-between items-center">
    <div class="flex items-center gap-2">
      <template v-if="!isEditing">
        <h3
          class="text-gray-800 font-bold cursor-pointer"
          @dblclick="startEdit"
        >
          {{ props.title }}
        </h3>
        <button @click="startEdit" class="cursor-pointer" title="Edit column">
          <PencilSquareIcon class="w-4" />
        </button>
      </template>
      <template v-else>
        <input
          v-model="editedTitle"
          id="column-title-input"
          name="column-title"
          class="bg-white border-1 border-blue-300 text-gray-800 rounded-xl focus:outline-blue-500 px-2 py-1"
          @keyup.enter="saveEdit"
          @blur="cancelEdit"
        />
        <button @mousedown.prevent="saveEdit" class="cursor-pointer" title="Save">
          <CheckIcon class="w-4" />
        </button>
        <button @click="cancelEdit" class="cursor-pointer" title="Cancel">
          <XMarkIcon class="w-4" />
        </button>
      </template>
    </div>
    <button v-if="!isEditing" @click="$emit('remove')" class="cursor-pointer" title="Delete column">
      <TrashIcon class="w-4" />
    </button>
  </div>
</template>


