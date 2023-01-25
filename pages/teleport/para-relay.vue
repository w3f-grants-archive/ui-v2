<template>
  <div>
    <h1>Para to Relay</h1>
    <n-space vertical>
      <asset-component />
      <address-component />
    </n-space>
    <n-space vertical>
      <span class="filler" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { NSpace } from 'naive-ui'
import AddressComponent from '~~/components/assets/address-component.vue'
import AssetComponent from '~~/components/assets/asset-component.vue'
</script>

<style scoped lang="scss">
.filler {
  min-height: 35vh;
  display: block;
}
</style>
