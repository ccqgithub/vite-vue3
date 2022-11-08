<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useElementSize } from '@vueuse/core';
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElPopover
} from 'element-plus';
import { getLangItem, LangSelects, LangType, setLanguage } from '@/i18n';
import imgLogo from '@/assets/logo.png';
import IconLang from '@/assets/icons/language.svg?component';
import IconMenu from '@/assets/icons/menu.svg?component';
import IconClose from '@/assets/icons/close.svg?component';
import * as US from '@/styles/utils.module.scss';
import S from './index.module.scss';

const { t, locale } = useI18n();
const lang = computed(() => {
  return getLangItem(locale.value as any)!;
});

const headerRef = ref<HTMLDivElement>();
const langRef = ref<HTMLDivElement>();
const { width } = useElementSize(headerRef);
const { width: langWidth } = useElementSize(langRef);
const menuShow = ref(false);

const langSelect = (v: LangType) => {
  setLanguage(v);
};
</script>

<template>
  <ElPopover
    :visible="menuShow"
    :show-arrow="false"
    :width="width"
    trigger="click"
    :offset="2"
    :popper-options="{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 1]
          }
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 0
          }
        }
      ]
    }"
    @hide="() => (menuShow = false)"
  >
    <template #reference>
      <header ref="headerRef" :class="S.header">
        <div
          :class="{
            [S.headerCon]: true,
            [US.container]: true
          }"
        >
          <div :class="S.left">
            <RouterLink :to="{ name: 'Home' }" :class="S.logo">
              <img :src="imgLogo" alt="home" />
              <span>Vite Vue3</span>
            </RouterLink>
          </div>
          <nav :class="S.center">
            <ul :class="S.navs">
              <li>
                <RouterLink
                  :to="{ name: 'Home' }"
                  :class="S.navLink"
                  :active-class="S.isActive"
                >
                  首页
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  :to="{ name: 'About' }"
                  :class="S.navLink"
                  :active-class="S.isActive"
                >
                  关于我们
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div :class="S.right">
            <ElDropdown trigger="hover">
              <div :class="S.lang">
                <IconLang :class="S.icon" />
                <span>{{ lang.text }}</span>
              </div>

              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="item in LangSelects"
                    :key="item.value"
                    @click="() => langSelect(item.value)"
                  >
                    {{ item.text }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>

            <div :class="S.menuToggle" @click="menuShow = !menuShow">
              <IconMenu v-if="!menuShow" />
              <IconClose v-if="menuShow" />
            </div>
          </div>
        </div>

        <!-- mobile -->
        <div></div>
      </header>
    </template>

    <!-- mobile menu -->
    <div :class="S.menu">
      <ul :class="S.navs">
        <li>
          <RouterLink
            :to="{ name: 'Home' }"
            :class="S.navLink"
            :active-class="S.isActive"
          >
            首页
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'About' }"
            :class="S.navLink"
            :active-class="S.isActive"
          >
            关于
          </RouterLink>
        </li>
        <ElDropdown
          trigger="click"
          placement="bottom-start"
          :width="langWidth"
          :class="S.langDropdown"
        >
          <div :class="S.langMobile">
            <IconLang :class="S.icon" />
            <span>{{ lang.text }}</span>
          </div>

          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem
                v-for="item in LangSelects"
                :key="item.value"
                @click="() => langSelect(item.value)"
              >
                {{ item.text }}
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </ul>
    </div>
  </ElPopover>
</template>
