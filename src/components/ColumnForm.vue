<script setup lang="ts" >
import {ref} from 'vue'
import DynamicInput from './DynamicInput.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'
import type {Column} from '@/types'

const columnName = ref<string>("");
const isFormVisible= ref<boolean>(false);
const isError = ref<boolean>(false);
const taskBoardStore = useTaskBoard()

const addColumn = taskBoardStore.addColumn

    const handleAddColumnClick = () => {
      if (!isInputInvalid()) {
        const newColumn: Column = {
          id: crypto.randomUUID(),
          name: columnName.value,
        }
        addColumn(newColumn)
        columnName.value = ''
      }

    }
    const toggleIsFormVisible = (value: boolean) => {
      isFormVisible.value = value
    }

    const isInputInvalid = () => {
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
      />
      <div class="flex items-center justify-start">
        <button
          @click="handleAddColumnClick"
          class="bg-sky-300 text-sky-100 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-md transform hover:bg-sky-400 hover:text-white hover:shadow-lg transition duration-300 ease-in-out mt-1.5 cursor-pointer"
        >
          Add column
        </button>
        <button @click="toggleIsFormVisible(false)" class="cursor-pointer">
          <XMarkIcon class="w-6 ml-2 mt-2 text-center" />
        </button>
      </div>

    </div>
  <div v-else class="bg-primary-lightest hover:bg-primary-light p-2 rounded-xl">
      <button @click="toggleIsFormVisible(true)" class="flex">
        <PlusIcon class=" w-5 mr-4 "/>
        Add list
      </button>
    </div>
  </div>
</template>



