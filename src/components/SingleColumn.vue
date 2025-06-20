<script setup lang="ts">
import type { ColumnDetails } from '@/types'
import ElementHeader from './ElementHeader.vue'

const { columnDetails } = defineProps<{ columnDetails: ColumnDetails }>()


</script>

<template>

  <div
    class="SingleColumn flex flex-col mx-4 w-80 px-4 py-2 bg-primary-light rounded-2xl shadow-md transform hover:shadow-xl transition duration-300 ease-in-out"
  >
    <div class="p-2">
      <ElementHeader
        :title="`${columnDetails.name}`"
      />

    </div>

  </div>
</template>


