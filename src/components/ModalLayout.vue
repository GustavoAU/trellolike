<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
const props = defineProps<{
  variant?: 'column' | 'task'
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const modalContainer = ref<HTMLDivElement | null>(null)

watch(
  () => props.isOpen,
  async (newValue) => {
    if (newValue) {
      await nextTick()
      modalContainer.value?.focus()
    }
  },
)
</script>

<template>
  <transition name="modal">
    <div v-if="isOpen" @keypress.escape="emit('close')">
      <div
        class="bg-white/10 backdrop-blur-xs fixed top-0 left-0 w-full h-full z-10"
        @click="emit('close')"
      ></div>
      <div
        ref="modalContainer"
        tabindex="0"
        class="w-xl p-4 z-20 fixed top-1/2 left-0 right-0 mx-auto bg-gray-200 rounded-2xl shadow-md transform hover:shadow-xl transition duration-300 ease-in-out outline-0"
      >
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.1s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.1s ease;
}
</style>
