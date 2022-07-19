<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <ul :style="{ marginBottom: '100px' }">
    <li>
      <RouterLink to="/">Home</RouterLink>
    </li>
    <li>
      <RouterLink to="/about">About</RouterLink>
    </li>
    <li>
      <RouterLink to="/jfkjf">404</RouterLink>
    </li>
  </ul>
  <RouterView></RouterView>
</template>
