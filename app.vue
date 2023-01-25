<template>
  <n-config-provider :theme="theme">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </n-config-provider>
</template>
<script setup lang="ts">
import { darkTheme, GlobalTheme, NConfigProvider } from 'naive-ui'
const mainStore = useMainStore()

const theme = computed<GlobalTheme | null>(() =>
  mainStore.darkTheme ? darkTheme : null
)
</script>
