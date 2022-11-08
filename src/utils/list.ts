import { ref, Ref, reactive, computed } from 'vue';
import { message } from '@/utils/message';

export const listState = <T = any>(args: {
  size: number;
  fetchPage: (params: {
    page: number;
    size: number;
  }) => Promise<{ items: T[]; total: number }>;
  // 请求是否可以覆盖
  canOverride?: boolean;
}) => {
  const { fetchPage, size, canOverride = true } = args;
  // list
  const list = ref<T[]>([]) as Ref<T[]>;
  const loading = ref(false);
  const refreshing = ref(false);
  const end = ref(false);
  const page = ref(1);
  const total = ref(0);
  const hasMore = computed(() => {
    return !end.value && !loading.value;
  });
  let fetchCount = 0;

  const gotoPage = async (p: number, isRefreshing = false) => {
    if (end.value && p > page.value) return;
    if (!canOverride && loading.value) return;

    const count = ++fetchCount;
    try {
      loading.value = true;
      isRefreshing && (refreshing.value = true);
      const res = await fetchPage({
        page: p,
        size: size
      });

      if (canOverride && count !== fetchCount) return;

      refreshing.value = false;
      loading.value = false;
      list.value = res.items;
      total.value = res.total;
      page.value = p;
      end.value = res.items.length < size;
    } catch (e: any) {
      if (canOverride && count !== fetchCount) return;

      refreshing.value = false;
      loading.value = false;
      message.error(e.message);
    }
  };

  return {
    state: reactive({
      list,
      loading,
      refreshing,
      end,
      page,
      size,
      hasMore,
      total
    }),
    gotoPage
  };
};

export const scrollListState = <T = any>(args: {
  size: number;
  fetchPage: (params: {
    page: number;
    size: number;
  }) => Promise<{ items: T[]; total?: number }>;
}) => {
  const { fetchPage, size } = args;
  // list
  const list = ref<T[]>([]) as Ref<T[]>;
  const loaded = ref(false);
  const refreshing = ref(false);
  const loading = ref(false);
  const end = ref(false);
  const page = ref(1);
  const total = ref(0);
  const hasMore = computed(() => {
    return !end.value && !loading.value && !refreshing.value;
  });
  let fetchCount = 0;
  let refreshCount = 0;

  const refresh = async () => {
    const count = ++refreshCount;
    try {
      refreshing.value = true;
      const res = await fetchPage({ page: 1, size });

      if (count !== refreshCount) return;

      list.value = res.items;
      total.value = res.total || 0;
      page.value = 1;
      refreshing.value = false;
      end.value = res.items.length < size;
      loaded.value = true;
    } catch (e: any) {
      if (count !== refreshCount) return;

      refreshing.value = false;
      message.error(e.message);
    }
  };

  const fetchNext = async () => {
    if (refreshing.value) return;
    if (end.value || !loaded.value) return;
    if (loading.value) return;

    const rCount = refreshCount;
    const count = ++fetchCount;
    const p = page.value + 1;
    try {
      loading.value = true;
      const res = await fetchPage({
        page: p,
        size: size
      });

      if (rCount !== refreshCount) return;
      if (count !== fetchCount) return;

      list.value.push(...res.items);
      total.value = res.total || 0;
      page.value = p;
      loading.value = false;
      end.value = res.items.length < size;
    } catch (e: any) {
      if (rCount !== refreshCount) return;
      if (count !== fetchCount) return;

      loading.value = false;
      message.error(e.message);
    }
  };

  return {
    state: reactive({
      list,
      loaded,
      refreshing,
      loading,
      end,
      page,
      size,
      hasMore,
      total
    }),
    refresh,
    fetchNext
  };
};
