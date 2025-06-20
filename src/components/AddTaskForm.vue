<script setup lang="ts">
import { ref } from 'vue'
import DynamicInput from './DynamicInput.vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid'

defineProps<{ columnId: string }>()

const inputName = ref('')
const inputAssignee = ref('')
const areaComment = ref('')
const isError = ref({ inputName: false, inputAssignee: false, areaComment: false })
const isTaskVisible = ref(true)


const handleAddTaskClick = (columnId: string) => {
  if (isInputInvalid()) {
    return
  }
}


const isInputInvalid = () => {
  isError.value = {
    inputName: inputName.value.trim().length === 0,
    inputAssignee: inputAssignee.value.trim().length === 0,
    areaComment: areaComment.value.trim().length === 0,
  }
  return (
    isError.value.inputName ||
    isError.value.inputAssignee ||
    isError.value.areaComment
  )
}

const toggleIsTaskIsVisible = (value: boolean) => {
  isTaskVisible.value = value
}
</script>



<template>
  <div v-if="isTaskVisible">
    <DynamicInput
      v-model="inputName"
      :isError="isError.inputName"
      placeholder="Insert task"
      errorMessage="Please fill out this field."
    />

    <DynamicInput
      v-model="inputAssignee"
      :isError="isError.inputAssignee"
      placeholder="Assignee"
      errorMessage="Please fill out this field."
    />

    <DynamicInput
      v-model="areaComment"
      :isError="isError.areaComment"
      errorMessage="Please fill out this field."
      variant="textarea"
      placeholder="Place a comment"
    />
    <div class="flex">
      <button
        @click="handleAddTaskClick(columnId)"
        class="bg-[#6AC9FF] text-[#C4E5F8] font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-md transform hover:bg-[#42B9FD] hover:text-white hover:shadow-lg transition duration-300 ease-in-out mt-1.5 cursor-pointer"
      >
        Add Task
      </button>
      <button @click="toggleIsTaskIsVisible(false)" class="cursor-pointer">
        <XMarkIcon class="w-6 ml-2 mt-2 text-center" />
      </button>
    </div>
  </div>
  <div v-else>
    <button
      @click="toggleIsTaskIsVisible(true)"
      class="flex hover:bg-primary-lightest py-2 px-4 rounded-xl"
    >
      <PlusIcon class="w-5 mr-2" /> Add another task
    </button>
  </div>
</template>

