<template>
  <n-space justify="space-between">
    <n-space>
      <img
        src="~/assets/images/paraspellLogo.png"
        alt="paraspell"
        width="150"
      />
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
    </n-space>
    <client-only>
      <layout-select />
      <wallet-component />
      <template #fallback>
        <n-button style="margin: 10px" disabled> Loading wallets... </n-button>
      </template>
    </client-only>
  </n-space>
</template>

<script lang="ts" setup>
import LayoutSelect from '@/components/utils/LayoutSelect.vue'
import WalletComponent from '@/components/wallet/WalletComponent.vue'
import {
  AppsFilled as AppsIcon,
  CycloneFilled as CycloneIcon,
  HomeFilled as HomeIcon,
} from '@vicons/material'
import type { MenuOption } from 'naive-ui'
import { NButton, NIcon, NMenu, NSpace } from 'naive-ui'
import { Component, h, ref } from 'vue'

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
    label: 'Channels',
    key: 'channels',
    icon: renderIcon(AppsIcon),
    children: [
      {
        label: () =>
          h(
            'a',
            {
              href: '/channels/open',
            },
            'Open channels'
          ),
        key: 'channels-open',
      },
      {
        label: () =>
          h(
            'a',
            {
              href: '/channels/close',
            },
            'Close channels'
          ),
        key: 'channels-close',
      },
    ],
  },
  {
    label: 'Teleport',
    key: 'teleport',
    icon: renderIcon(CycloneIcon),
    children: [
      {
        label: () =>
          h(
            'a',
            {
              href: '/teleport/relay-para',
            },
            'From relay chain'
          ),
        key: 'teleport-relay-para',
      },
      {
        label: () =>
          h(
            'a',
            {
              href: '/teleport/para-relay',
            },
            'From para-chain'
          ),
        key: 'teleport-para-relay',
      },
      {
        label: () =>
          h(
            'a',
            {
              href: '/teleport/para-para',
            },
            'Para to Para'
          ),
        key: 'teleport-para-para',
      },
    ],
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
