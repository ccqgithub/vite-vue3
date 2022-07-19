import { ref } from 'vue';
import { defineStore } from 'pinia';
import { InjectionContext } from 'pinia-di';

export const AppStore = ({ useStoreId }: InjectionContext) => {
  return defineStore(useStoreId('AppStore'), () => {
    const test = ref('');
    const init = () => {};

    return {
      test,
      init
    };
  });
};
