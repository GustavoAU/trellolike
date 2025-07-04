<script setup lang="ts">
import ElementHeader from './ElementHeader.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'
import TaskList from './TaskList.vue'
import ConfirmationBox from './ConfirmationBox.vue'
import { ref } from 'vue'


type ColumnDetailsProps = {
  id: string
  title: string
}

const { columnDetails } = defineProps<{ columnDetails: ColumnDetailsProps }>()

const isConfirmVisible = ref<boolean>(false)

const taskBoardStore = useTaskBoard()
const removeColumn  = taskBoardStore.removeColumn

const confirmRemove = ():void => {
  removeColumn(columnDetails.id)
  isConfirmVisible.value = false
}

const cancelRemove = ():void => {
  isConfirmVisible.value = false
}
const handleRemoveRequest = ():void => {
  isConfirmVisible.value = true
}

</script>

<template>

  <div
    class="SingleColumn flex flex-col mx-4 w-80 px-4 py-2 bg-primary-light rounded-2xl shadow-md transform hover:shadow-xl transition duration-300 ease-in-out"
  >
    <div class="p-2">
      <ElementHeader
        :title="`${columnDetails.title}`"
        @remove="handleRemoveRequest"
      />
      <TaskList :columnId="columnDetails.id" />
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


