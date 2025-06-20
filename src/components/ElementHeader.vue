<script setup lang="ts">
const { title } = defineProps<{ title: string }>()

</script>


<template>
  <div class="ElementHeader flex justify-between items-center">
    <h3 class="text-gray-800 font-bold">{{ title }}</h3>
  </div>
</template>


