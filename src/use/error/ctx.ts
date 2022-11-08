import { InjectionKey } from 'vue';

export const ErrorCaptureKey = Symbol() as InjectionKey<{
  throwError: (error: any) => void;
}>;
