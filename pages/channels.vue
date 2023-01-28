<template>
  <nuxt-layout name="full-layout">
    <n-grid :cols="2" x-gap="24">
      <n-gi>
        <open-connection />
      </n-gi>
      <n-gi>
        <close-connection />
      </n-gi>
    </n-grid>
  </nuxt-layout>
</template>
<script setup lang="ts">
import { NGrid, NGi } from 'naive-ui'
import OpenConnection from '~/components/channels/open-connection.vue'
import CloseConnection from '~/components/channels/close-connection.vue'
definePageMeta({
  layout: false,
})
const channelStore = useChannelStore()
onMounted(async () => {
  await channelStore.loadParachains()
  await channelStore.loadChannels()
})
</script>
