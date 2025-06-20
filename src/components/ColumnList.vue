<script setup lang="ts">
import { useTaskBoard } from '@/stores/useTaskBoardStore'
import { storeToRefs } from 'pinia'
import SingleColumn from './SingleColumn.vue'

const taskBoardStore = useTaskBoard()
const { getColumns } = storeToRefs(taskBoardStore)
</script>




<template>
  <div class="ColumnListContainer flex flex-col items-center mt-4">
    <div v-if="getColumns.length > 0" class="ColumnList flex items-start px-2">
      <SingleColumn v-for="column in getColumns" :key="column.id" :columnDetails="column" />
    </div>
    <p v-else class="text-md text-gray-400 text-center">There are no columns, add one</p>
  </div>
</template>



