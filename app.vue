<template>
  <n-config-provider :theme="theme">
    <n-notification-provider>
      <nuxt-layout name="default-layout">
        <nuxt-page />
      </nuxt-layout>
    </n-notification-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import {
  darkTheme,
  GlobalTheme,
  NConfigProvider,
  NNotificationProvider,
} from 'naive-ui'
const mainStore = useMainStore()
const theme = computed<GlobalTheme | null>(() =>
  mainStore.darkTheme ? darkTheme : null
)
</script>
