<template>
  <n-config-provider :theme="theme">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </n-config-provider>
</template>
<script setup lang="ts">
import { lightTheme, NConfigProvider } from 'naive-ui'

const theme = ref(lightTheme)
</script>
