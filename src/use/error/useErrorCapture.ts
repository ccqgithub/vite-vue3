import { provide, ref } from 'vue';
import { GeneralError, normalizeError } from '@/utils';
import { ErrorCaptureKey } from './ctx';

export const useErrorCapture = () => {
  const error = ref<GeneralError | null>(null);

  provide(ErrorCaptureKey, {
    throwError: (err) => {
      error.value = normalizeError(err);
    }
  });

  return {
    error,
    clearError: () => (error.value = null)
  };
};
