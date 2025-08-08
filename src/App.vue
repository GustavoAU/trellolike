<script setup lang="ts">
import ColumnForm from './components/ColumnForm.vue'
import ColumnList from './components/ColumnList.vue'
</script>

<template>
  <main>
    <div class="flex items-start ml-2 mt-12">
      <div>
        <ColumnList />
      </div>
      <div>
        <ColumnForm />
      </div>
    </div>
  </main>
</template>
