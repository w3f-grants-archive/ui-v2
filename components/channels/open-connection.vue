<template>
  <h1>Open channel</h1>
  <n-form>
    <n-form-item label="Select source">
      <n-select v-model:value="sourceChain" :options="parachainSourceOptions" />
    </n-form-item>
    <n-form-item label="Select destination">
      <n-select
        v-model:value="destinationChain"
        :options="parachainDestinationOptions"
      />
    </n-form-item>
    <n-button
      type="primary"
      style="width: 100%"
      :disabled="!canOpenChannel"
      @click="openChannel"
    >
      Open
    </n-button>
  </n-form>
</template>
<script setup lang="ts">
import { SelectOption, NSelect, NForm, NFormItem, NButton } from 'naive-ui'

const channelStore = useChannelStore()

onMounted(() => {
  channelStore.loadParachains()
})

const availibleChains = computed(() => channelStore.parachains)

const sourceChain = ref<number | null>()
const destinationChain = ref<number | null>()

const parachainSourceOptions = computed<SelectOption[]>(() =>
  availibleChains.value
    .filter((chain) => chain.id !== destinationChain.value)
    .map((val) => ({ label: val.name, value: val.id }))
)

const parachainDestinationOptions = computed<SelectOption[]>(() =>
  availibleChains.value
    .filter((chain) => chain.id !== sourceChain.value)
    .map((val) => ({ label: val.name, value: val.id }))
)
const canOpenChannel = computed(
  () => sourceChain.value && destinationChain.value
)
const openChannel = () => {
  channelStore.openChannel(sourceChain.value!, destinationChain.value!)
}
</script>
