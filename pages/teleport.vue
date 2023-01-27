<template>
  <nuxt-layout name="default-layout">
    <h1>Teleport</h1>
    <n-space vertical>
      <asset-transfer-component />
    </n-space>
    <n-space vertical>
      <span class="filler" />
    </n-space>
  </nuxt-layout>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'
import AssetTransferComponent from '~~/components/assets/asset-transfer-component.vue'
definePageMeta({
  layout: false,
})
</script>

<style scoped lang="scss">
.filler {
  min-height: 35vh;
  display: block;
}
</style>
