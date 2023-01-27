<template>
  <n-space justify="space-between">
    <n-space>
      <img src="images/paraspellLogo.png" alt="paraspell" width="150" />
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
    </n-space>
    <n-space justify="end" align="center">
      <client-only>
        <account-component />
        <template #fallback>
          <n-button style="margin: 10px" disabled>
            Loading accounts...
          </n-button>
        </template>
      </client-only>
      <client-only>
        <dark-mode
          v-if="mainStore.darkTheme"
          class="themeIcon"
          @click="mainStore.changeTheme()"
        />
        <light-mode v-else class="themeIcon" @click="mainStore.changeTheme()" />
      </client-only>
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
import {
  AppsFilled as AppsIcon,
  CycloneFilled as CycloneIcon,
  DarkModeFilled as DarkMode,
  DarkModeTwotone as LightMode,
  HomeFilled as HomeIcon,
} from '@vicons/material'
import type { MenuOption } from 'naive-ui'
import { NButton, NIcon, NMenu, NSpace } from 'naive-ui'
import { Component, h, ref } from 'vue'
import AccountComponent from '@/components/account/account-component.vue'

const mainStore = useMainStore()

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        'a',
        {
          href: '/',
        },
        'Home'
      ),
    key: 'home',
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/channels',
        },
        'Channels'
      ),
    key: 'channels',
    icon: renderIcon(AppsIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/teleport',
        },
        'Teleport'
      ),
    key: 'teleport',
    icon: renderIcon(CycloneIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '/xyk',
        },
        'XYK'
      ),
    key: 'xyk',
  },
]

const activeKey = ref<string | null>(null)
</script>

<style lang="scss" scoped>
.themeIcon {
  width: 30px;
  cursor: pointer;
  margin-right: 5px;
}
</style>
