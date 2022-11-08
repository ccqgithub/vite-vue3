<script setup lang="ts">
import { onErrorCaptured } from 'vue';
import { normalizeError } from '@/utils';
import { useErrorCapture } from '@/use';
import ErrorWrapper from './ErrorWrapper.vue';
import { VErrorWrapperProps } from './types';

const props = defineProps(VErrorWrapperProps);
const emit = defineEmits<{
  (e: 'clear-error'): void;
}>();

const { error, clearError } = useErrorCapture();
const refresh = () => {
  clearError();
  emit('clear-error');
};

onErrorCaptured((err) => {
  error.value = normalizeError(err);
});
</script>

<template>
  <ErrorWrapper :error="props.error || error" @clear-error="refresh">
    <slot />
  </ErrorWrapper>
</template>
