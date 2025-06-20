<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
const { title } = defineProps<{ title: string }>()

</script>


<template>
  <div class="ElementHeader flex justify-between items-center">
    <h3 class="text-gray-800 font-bold">{{ title }}</h3>
    <button @click="$emit('remove')" class="cursor-pointer">
      <TrashIcon class="w-4" />
    </button>
  </div>
</template>


