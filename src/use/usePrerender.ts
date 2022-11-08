import { Ref, watchEffect, nextTick, onMounted, ref } from 'vue';

export const usePrerender = (v?: Ref<any>) => {
  const mounted = ref(false);

  watchEffect(() => {
    if (v?.value || (!v && mounted)) {
      nextTick(() => {
        (window as any).prerenderReady = true;
      });
    }
  });

  onMounted(() => {
    mounted.value = true;
  });
};
