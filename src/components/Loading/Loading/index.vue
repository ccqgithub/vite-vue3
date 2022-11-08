<script setup lang="ts">
import IconLoading from '@/assets/icons/loading.svg?component';
import S from './index.module.scss';

const props = defineProps({
  absolute: {
    type: Boolean,
    default: true
  },
  lock: {
    type: Boolean,
    default: true
  },
  icon: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div
    :class="{
      [S.loading]: true,
      [S.isAbsolute]: props.absolute,
      [S.isLock]: props.lock
    }"
  >
    <div :class="S.iconBox">
      <span v-if="props.icon" :class="S.icon">
        <IconLoading />
      </span>
    </div>
  </div>
</template>
