<script setup lang="ts">
import ElementHeader from './ElementHeader.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'

type ColumnDetailsProps = {
  id: string
  name: string
}

const { columnDetails } = defineProps<{ columnDetails: ColumnDetailsProps }>()

const taskBoardStore = useTaskBoard()
const removeColumn  = taskBoardStore.removeColumn

</script>

<template>

  <div
    class="SingleColumn flex flex-col mx-4 w-80 px-4 py-2 bg-primary-light rounded-2xl shadow-md transform hover:shadow-xl transition duration-300 ease-in-out"
  >
    <div class="p-2">
      <ElementHeader
        :title="`${columnDetails.name}`"
        @remove="removeColumn(columnDetails.id)"
      />

    </div>

  </div>
</template>


