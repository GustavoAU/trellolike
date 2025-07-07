<script setup lang="ts">
import { ref } from 'vue'
import DynamicInput from './DynamicInput.vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useTaskBoard } from '@/stores/useTaskBoardStore'

type Task = {
  id: string
  title: string
  assignee: string
  comment: string
}

defineProps<{ columnId: string }>()

const inputName = ref<string>('')
const inputAssignee = ref<string>('')
const areaComment = ref<string>('')
const isError = ref<{ inputName: boolean; inputAssignee: boolean; areaComment: boolean }>({
  inputName: false,
  inputAssignee: false,
  areaComment: false,
})
const isTaskVisible = ref<boolean>(true)
const taskBoardStore = useTaskBoard()
const addTask  = taskBoardStore.addTask



const handleAddTaskClick = (columnId: string):void => {
  if (isInputInvalid()) {
    return
  }
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: inputName.value,
    assignee: inputAssignee.value,
    comment: areaComment.value,
  }

  addTask({columnId, task: newTask})
  inputName.value = ''
  inputAssignee.value = ''
  areaComment.value = ''
};


const isInputInvalid = ():boolean => {
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

const toggleIsTaskIsVisible = (value: boolean):void => {
  isTaskVisible.value = value
}
</script>



<template>
  <div v-if="isTaskVisible" class="AddTaskForm mt-20">
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
        class="bg-sky-400 text-sky-100 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-md transform hover:bg-sky-500 hover:text-white hover:shadow-lg transition duration-300 ease-in-out mb-4 cursor-pointer">
        Add Task
      </button>
      <button @click="toggleIsTaskIsVisible(false)" class="cursor-pointer">
        <XMarkIcon class="w-6 ml-2 mb-4 text-center" />
      </button>
    </div>
  </div>
  <div v-else>
    <button
      @click="toggleIsTaskIsVisible(true)"
      class="flex hover:bg-primary-lightest py-2 px-4 rounded-xl"
    >
      <PlusIcon class="w-5 mr-2" /> Add task
    </button>
  </div>
</template>

