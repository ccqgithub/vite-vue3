import { inject } from 'vue';
import { GeneralError, normalizeError } from '@/utils';
import { ErrorCaptureKey } from './ctx';

export const useError = () => {
  const ctx = inject(ErrorCaptureKey, null);

  return {
    throwError: (e: Error | GeneralError) => {
      const err = normalizeError(e);
      if (ctx) {
        ctx.throwError(err);
      } else {
        throw err;
      }
    }
  };
};
