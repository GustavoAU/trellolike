<script setup lang="ts">
import ElementHeader from './ElementHeader.vue'
import { useTaskBoard } from '@/stores/useTaskBoardStore'
import TaskList from './TaskList.vue'
import ConfirmationBox from './ConfirmationBox.vue'
import { ref, computed } from 'vue'


const props = defineProps<{ columnId: string }>()
const taskBoardStore = useTaskBoard()

const columnDetails = computed(() =>
  taskBoardStore.getColumns.find(column => column.id === props.columnId)
)

const isConfirmVisible = ref<boolean>(false)
const removeColumn  = taskBoardStore.removeColumn

const confirmRemove = ():void => {
  if (columnDetails.value) {
    removeColumn(columnDetails.value.id)
  }
  isConfirmVisible.value = false
}

const cancelRemove = ():void => {
  isConfirmVisible.value = false
}
const handleRemoveRequest = ():void => {
  isConfirmVisible.value = true
}

const handleEditColumn = (payload: {title:string}):void => {
  if (columnDetails.value) {
    taskBoardStore.editColumn(columnDetails.value.id, {
      id: columnDetails.value.id,
      title: payload.title })
  }
}
</script>

<template>
  <div
    v-if="columnDetails"
    class="SingleColumn flex flex-col mx-4 w-80 px-4 py-2 bg-primary-light rounded-2xl shadow-md transform hover:shadow-xl transition duration-300 ease-in-out">
    <div class="py-2">
      <ElementHeader
        :type="'column'"
        :title="columnDetails?.title"
        @remove="handleRemoveRequest"
        @editColumn="handleEditColumn"
      />
    </div>
    <TaskList :columnId="columnDetails?.id" />
    <transition name="fade-scale" appear>
      <ConfirmationBox
        v-if="isConfirmVisible"
        title="Are you sure?"
        message="Deleting this column will also remove all associated tasks. Continue?"
        @confirm="confirmRemove"
        @cancel="cancelRemove"
      />
    </transition>
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


