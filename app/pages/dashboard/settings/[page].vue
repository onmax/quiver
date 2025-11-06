<script setup lang="ts">
const route = useRoute()
const path = computed(() => route.path)
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <h1 class="text-4xl font-bold">{{ path }}</h1>
    <p class="text-muted">This page is under construction</p>
  </div>
</template>
