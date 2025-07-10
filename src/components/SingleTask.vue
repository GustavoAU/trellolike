<script setup lang="ts">
import { ref } from 'vue'
import ElementHeader from './ElementHeader.vue'
import ConfirmationBox from './ConfirmationBox.vue'

const emit = defineEmits<{
  (e: 'removeTask', task: { id: string, title: string, assignee: string, comment: string }): void
}>()


const props = defineProps<{
  task: {
    id: string
    title: string
    assignee: string
    comment: string
  }
}>()

const isConfirmVisible = ref(false)


const confirmRemove = ():void => {
  emit('removeTask', props.task)
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
    class="SingleTask text-gray-800 w-full bg-primary-dark p-2 mb-10 mt-6 rounded-xl shadow-md transform hover:shadow-lg transition duration-300 ease-in-out"
  >
    <ElementHeader
    :type= "'task'"
    :title="props.task.title"
    @remove="handleRemoveRequest"

    />
    <transition
        name="fade-scale"
        appear
      >
      <ConfirmationBox
        v-if="isConfirmVisible"
        title="Are you sure?"
        message="You are about to remove this task. Continue?"
        @confirm="confirmRemove"
        @cancel="cancelRemove"
      />
    </transition>
    <p>Assignee: {{ task.assignee }}</p>
    <p>Comment: {{ task.comment }}</p>
  </div>
</template>


