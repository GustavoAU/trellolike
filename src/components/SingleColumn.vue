<script setup lang="ts">
import ElementHeader from './ElementHeader.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'
import AddTaskForm from './AddTaskForm.vue'
import ConfirmationBox from './ConfirmationBox.vue'
import { ref } from 'vue'


type ColumnDetailsProps = {
  id: string
  name: string
}

const { columnDetails } = defineProps<{ columnDetails: ColumnDetailsProps }>()

const isConfirmVisible = ref(false)

const taskBoardStore = useTaskBoard()
const removeColumn  = taskBoardStore.removeColumn

const confirmRemove = () => {
  removeColumn(columnDetails.id)
  isConfirmVisible.value = false
}

const cancelRemove = () => {
  isConfirmVisible.value = false
}
const handleRemoveRequest = () => {
  isConfirmVisible.value = true
}

</script>

<template>

  <div
    class="SingleColumn flex flex-col mx-4 w-80 px-4 py-2 bg-primary-light rounded-2xl shadow-md transform hover:shadow-xl transition duration-300 ease-in-out"
  >
    <div class="p-2">
      <ElementHeader
        :title="`${columnDetails.name}`"
        @remove="handleRemoveRequest"
      />
    <transition
        name="fade-scale"
        appear
      >
      <ConfirmationBox
        v-if="isConfirmVisible"
        title="Are you sure?"
        message="Deleting this column will also remove all associated tasks. Continue?"
        @confirm="confirmRemove"
        @cancel="cancelRemove"
      />
    </transition>

    </div>
    <div>
      <AddTaskForm :columnId="columnDetails.id" />
    </div>

  </div>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

</style>


