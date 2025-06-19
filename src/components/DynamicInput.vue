<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  errorMessage: String,
  isError: Boolean,
  modelValue: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'input',
    validator: (value: string) => ['input', 'textarea'].includes(value),
  },
  placeholder: String,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
  emit('update:modelValue', value || '')
}
</script>

<template>
  <div class="relative pb-6">
    <input
      v-if="variant === 'input'"
      class="w-full bg-white border border-blue-300 text-gray-900 rounded-xl focus:outline-blue-400 p-2"
      type="text"
      :value="modelValue"
      @input="updateValue(($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
    />

    <textarea
      v-else-if="props.variant === 'textarea'"
      class="w-full bg-white border border-blue-300 text-gray-900 rounded-xl focus:outline-blue-400 resize-none p-2"
      :value="props.modelValue"
      @input="updateValue(($event.target as HTMLTextAreaElement).value)"
      :placeholder="props.placeholder"
    ></textarea>

    <p class="absolute text-red-500" v-if="props.isError">
      {{ props.errorMessage }}
    </p>
  </div>
</template>
