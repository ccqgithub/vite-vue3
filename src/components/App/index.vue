<script setup lang="ts">
import { RouterView } from 'vue-router';
import { ErrorCapture } from '@/components/ErrorWrapper';
</script>

<template>
  <ErrorCapture>
    <RouterView></RouterView>
  </ErrorCapture>
</template>
