<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { LangType, setLanguage } from '@/i18n';

const { t, locale } = useI18n();
const lang = computed<[LangType, string]>(() => {
  if (locale.value === LangType.EN) {
    return [LangType.ZH, '中文'];
  }
  return [LangType.EN, 'English'];
});
const setLang = (lang: LangType) => {
  setLanguage(lang);
};
</script>

<template>
  <div :style="{ width: '500px', margin: '0 auto' }">
    <h1>{{ t('website.title') }}</h1>
    <div :style="{ marginTop: '50px', cursor: 'pointer' }">
      <a @click="setLang(lang[0])">
        {{ lang[1] }}
      </a>
    </div>
  </div>
</template>
