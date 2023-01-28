<template>
  <n-space vertical align="center">
    <h1>Active channels</h1>
    <n-alert v-if="!hasChannels" title="No channels" type="warning">
      There are currently no opened channels.
    </n-alert>
    <div v-for="(subchannels, key) in channels" :key="key">
      <n-button
        v-for="sub in subchannels"
        :key="`${key}-${sub}`"
        :loading="loading"
        ghost
        @click="channelStore.closeChannelConnections(key, sub)"
      >
        <template #icon>
          <n-icon>
            <close-icon />
          </n-icon>
        </template>
        {{ getChainName(key) }} &lt;-> {{ getChainName(sub) }}
      </n-button>
    </div>
  </n-space>
</template>
<script lang="ts" setup>
import { NButton, NIcon, NSpace, NAlert } from 'naive-ui'
import { CloseFilled as CloseIcon } from '@vicons/material'
const channelStore = useChannelStore()

const channels = computed<Record<number, number[]>>(() => channelStore.channels)

const hasChannels = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, subchannels] of Object.entries(channels.value) as unknown as [
    number,
    number[]
  ][]) {
    if (subchannels?.length) return true
  }
})

const loading = computed(() => channelStore.hasActiveClosing)

const getChainName = (chainId: number) => channelStore.parachains[chainId]
</script>
