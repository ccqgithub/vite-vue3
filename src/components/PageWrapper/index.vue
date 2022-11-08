<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowSize, useElementSize, MaybeElement } from '@vueuse/core';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ErrorCapture } from '@/components/ErrorWrapper';
import { Loading } from '@/components/Loading';
import { useSEO } from '@/use';
import S from './index.module.scss';

const props = defineProps({
  header: {
    type: Boolean,
    default: true
  },
  footer: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  keywords: {
    type: String,
    default: null
  }
});
const emit = defineEmits<{
  (e: 'clearError'): void;
}>();

const { title, description, keywords } = toRefs(props);
const route = useRoute();

const pageRef = ref<MaybeElement>();
const footerRef = ref<MaybeElement>();
const headerRef = ref<MaybeElement>();
const { height: winHeight } = useWindowSize();
const { height: footerHeight } = useElementSize(footerRef);
const { height: headerHeight } = useElementSize(headerRef);

const isMini = computed(() => {
  return route.query.mini === '1';
});
const showHeader = computed(() => {
  if (isMini.value) {
    return false;
  }
  return props.header;
});
const showFooter = computed(() => {
  if (isMini.value) {
    return false;
  }
  return props.footer;
});

useSEO({
  title,
  description,
  keywords
});
</script>

<template>
  <div
    ref="pageRef"
    :class="{
      [S.page]: true,
      [S.isMini]: isMini
    }"
    :style="{
      paddingBottom: `${footerHeight}px`,
      paddingTop: `${headerHeight}px`
    }"
  >
    <!-- header -->
    <div v-if="showHeader" ref="headerRef" :class="S.header">
      <Header></Header>
    </div>

    <!-- main -->
    <div
      :class="{
        [S.wrapper]: true
      }"
      :style="{
        minHeight: `${winHeight - headerHeight - footerHeight}px`
      }"
    >
      <Loading v-if="props.loading"></Loading>
      <ErrorCapture @clear-error="emit('clearError')">
        <slot></slot>
      </ErrorCapture>
    </div>

    <!-- footer -->
    <div v-if="showFooter" ref="footerRef" :class="S.foot">
      <Footer></Footer>
    </div>
  </div>
</template>
