<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import US from '@/styles/utils.module.scss';
import S from './index.module.scss';

const { locale } = useI18n();
</script>

<template>
  <div :class="S.footerWrapper">
    <div :class="US.container">
      <div :class="S.footer">
        <div :class="S.block">
          <div :class="S.item">© 2021 xxxx. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  </div>
</template>
