<script setup lang="ts">
import { VErrorWrapperProps } from './types';
import ErrorNetWork from './ErrorNetWork.vue';
import ErrorGeneral from './ErrorGeneral.vue';

const props = defineProps(VErrorWrapperProps);
const emit = defineEmits<{
  (e: 'clear-error'): void;
}>();

const refresh = () => {
  emit('clear-error');
};
</script>

<template>
  <slot v-if="!props.error" />
  <ErrorNetWork
    v-else-if="props.error?.type === 'NETWORK_ERROR'"
    v-bind="props"
    @clear-error="refresh"
  />
  <ErrorGeneral v-else v-bind="props" @clear-error="refresh" />
</template>
