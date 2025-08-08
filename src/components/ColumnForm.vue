<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import DynamicInput from './DynamicInput.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'
import CustomButton from './CustomButton.vue'

type Column = {
  id: string
  title: string
}

const columnName = ref<string>('')
const isFormVisible = ref<boolean>(false)
const isError = ref<boolean>(false)
const taskBoardStore = useTaskBoard()

const addColumn = taskBoardStore.addColumn

const addNewColumn = (): void => {
  if (!isInputInvalid()) {
    const newColumn: Column = {
      id: crypto.randomUUID(),
      title: columnName.value,
    }
    addColumn(newColumn)
    columnName.value = ''
  }
}
const toggleIsFormVisible = (value: boolean): void => {
  isFormVisible.value = value
}

const isInputInvalid = (): boolean => {
  isError.value = columnName.value.trim().length === 0
  return columnName.value.trim().length === 0
}
</script>

<template>
  <div class="AddColumn w-80 ml-3 mt-4">
    <div v-if="isFormVisible" class="bg-primary-light px-4 py-6 rounded-xl">
      <DynamicInput
        v-model="columnName"
        :isError="isError"
        errorMessage="Please fill out this field."
        placeholder="List name"
        @keyup.enter="addNewColumn"
      />
      <div class="flex items-center justify-start">
        <CustomButton @click="addNewColumn">
          <p>Add Column</p>
        </CustomButton>
        <button @click="toggleIsFormVisible(false)" class="cursor-pointer">
          <XMarkIcon class="w-6 ml-2 text-center" />
        </button>
      </div>
    </div>
    <div v-else class="bg-primary-lightest hover:bg-primary-light p-2 rounded-xl">
      <button @click="toggleIsFormVisible(true)" class="flex cursor-pointer">
        <PlusIcon class="w-5 mr-4" />
        Add list
      </button>
    </div>
  </div>
</template>
