<script setup lang="ts">
import iconWarning from '@/assets/icons/warning.svg';
import { VErrorWrapperProps } from './types';
import S from './index.module.scss';

const props = defineProps(VErrorWrapperProps);
const emit = defineEmits<{
  (e: 'clear-error'): void;
}>();

const refresh = () => {
  emit('clear-error');
};
</script>

<template>
  <div :class="S.box">
    <div :class="S.con">
      <img :src="iconWarning" :class="S.icon" mode="aspectFit" />
      <div :class="S.title">{{ props.error?.message || '服务器错误' }}</div>
      <div :class="S.text">
        {{ props.error?.info || '抱歉，服务器出错。请稍后再试。' }}
      </div>
      <div :class="S.refresh" @click="refresh">刷新</div>
    </div>
  </div>
</template>
