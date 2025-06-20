<script setup lang="ts">
defineProps<{
  title?: string
  message?: string
}>()

</script>

<template>
  <div class="ConfirmationBox fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/0.1 bg-opacity-30 z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-4">
        <button @click="$emit('confirm')" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">Confirm</button>
        <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200">Cancel</button>
      </div>
    </div>
</div>

</template>


