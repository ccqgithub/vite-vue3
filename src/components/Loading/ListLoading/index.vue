<script setup lang="ts">
import IconLoading from '@/assets/icons/refresh.svg?component';
import S from './index.module.scss';

const props = defineProps({
  icon: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div
    :class="{
      [S.loading]: true
    }"
  >
    <span v-if="props.icon" :class="S.icon">
      <IconLoading />
    </span>
  </div>
</template>
