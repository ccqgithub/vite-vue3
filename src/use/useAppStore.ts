import { useStore } from 'pinia-di';
import { AppStore } from '@/store';

export const useAppStore = () => {
  const app = useStore(AppStore);
  return app;
};
