<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline'
  }>(),
  {
    variant: 'solid',
  },
)

const buttonClasses = computed(() => {
  return props.variant === 'solid'
    ? 'font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-md transform transition duration-300 ease-in-out cursor-pointer bg-sky-400 text-sky-100 hover:bg-sky-500 hover:text-white hover:shadow-lg'
    : 'font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline shadow-md transform transition duration-300 ease-in-out cursor-pointer bg-white/40 text-sky-400 border-1 border-sky-400 hover:bg-sky-200 hover:text-sky-500 hover:shadow-lg'
})
</script>

<template>
  <button :class="buttonClasses">
    <slot></slot>
  </button>
</template>
