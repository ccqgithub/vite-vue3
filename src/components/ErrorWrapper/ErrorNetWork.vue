<script setup lang="ts">
import iconNetworkError from '@/assets/icons/wifi-off.svg';
import { VErrorWrapperProps } from './types';
import S from './index.module.scss';

const props = defineProps(VErrorWrapperProps);
const emits = defineEmits<{
  (e: 'clear-error'): void;
}>();

const refresh = () => {
  emits('clear-error');
};
</script>

<template>
  <div v-if="props.error" :class="S.box">
    <div :class="S.con">
      <img :src="iconNetworkError" :class="S.icon" mode="aspectFit" />
      <div :class="S.title">网络不可用</div>
      <div :class="S.text">请检查您的网络设置后重试。</div>
      <div :class="S.refresh" @click="refresh">刷新</div>
    </div>
  </div>
</template>
