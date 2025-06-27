<script setup lang="ts">
import ElementHeader from './ElementHeader.vue'

const props = defineProps<{
  task: {
    id: string
    title: string
    assignee: string
    comment: string
  }
}>()
</script>

<template>
  <div
    class="SingleTask text-[#222] w-full bg-primary-dark p-2 mb-20 mt-10 rounded-xl shadow-md transform hover:shadow-lg transition duration-300 ease-in-out"
  >
    <ElementHeader
      :title="`${props.task.title}`"
    />
    <p>Assignee: {{ task.assignee }}</p>
    <p>Comment: {{ task.comment }}</p>
  </div>
</template>


