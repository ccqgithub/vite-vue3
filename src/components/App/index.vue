<script setup lang="ts">
import { HelloWorld } from '@/components';
import * as S from './index.module.scss';
</script>

<template>
  <div :class="S.box">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld />
  </div>
</template>
