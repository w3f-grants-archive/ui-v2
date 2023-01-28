<template>
  <n-space vertical align="center">
    <h1>Open channel</h1>
  </n-space>
  <n-form>
    <n-form-item label="Select source">
      <n-select
        v-if="chainsLoaded"
        v-model:value="sourceChain"
        :options="parachainSourceOptions"
      />
      <n-skeleton v-else size="medium" :sharp="false" />
    </n-form-item>
    <n-form-item label="Select destination">
      <n-select
        v-if="chainsLoaded"
        v-model:value="destinationChain"
        :options="parachainDestinationOptions"
      />
      <n-skeleton v-else size="medium" :sharp="false" />
    </n-form-item>
    <n-button
      v-if="chainsLoaded"
      type="primary"
      style="width: 100%"
      :disabled="!canOpenChannel"
      @click="openChannel"
    >
      Open
    </n-button>
    <n-skeleton v-else size="medium" />
  </n-form>
</template>
<script setup lang="ts">
import {
  SelectOption,
  NSelect,
  NForm,
  NFormItem,
  NButton,
  NSkeleton,
  NSpace,
} from 'naive-ui'

const channelStore = useChannelStore()

const chainsLoaded = computed(() => channelStore.apiConnected)

const activeChannels = computed(() => channelStore.channels)

const availibleChains = computed(() =>
  Object.entries(channelStore.parachains).map(([id, name]) => ({
    id: Number(id),
    name,
  }))
)

const sourceChain = ref<number | null>()
const destinationChain = ref<number | null>()

/**
 * Filter out already selected chain and opened connection
 */
const parachainSourceOptions = computed<SelectOption[]>(() =>
  availibleChains.value
    .filter(
      (chain) =>
        chain.id !== destinationChain.value &&
        !activeChannels.value[chain.id]?.includes(destinationChain.value!) &&
        !activeChannels.value[destinationChain.value!]?.includes(chain.id)
    )
    .map((val) => ({ label: val.name, value: val.id }))
)

/**
 * Filter out already selected chain and opened connection
 */
const parachainDestinationOptions = computed<SelectOption[]>(() =>
  availibleChains.value
    .filter(
      (chain) =>
        chain.id !== sourceChain.value &&
        !activeChannels.value[chain.id]?.includes(sourceChain.value!) &&
        !activeChannels.value[sourceChain.value!]?.includes(chain.id)
    )
    .map((val) => ({ label: val.name, value: val.id }))
)
/**
 * Check if source and destination was selected
 */
const canOpenChannel = computed(
  () => sourceChain.value && destinationChain.value
)
const openChannel = () => {
  channelStore.openChannel(sourceChain.value!, destinationChain.value!)
}
</script>
