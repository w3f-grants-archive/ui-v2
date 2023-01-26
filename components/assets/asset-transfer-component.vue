<template>
  <n-space vertical>
    <n-alert title="Current support" type="info">
      Currently supported chains on Paraspell: &nbsp;
      <code>{{ SUPPORTED_NODES.join(', ') }}</code>
    </n-alert>
    <n-alert v-if="!hasWallet" title="Select wallet" type="error">
      You didn't select any wallet. Please select your wallet to continue with
      teleport process.
    </n-alert>
    <n-alert v-else title="Your wallet" type="info">
      Your current wallet: &nbsp;
      <code>{{ wallet?.meta.source }} ({{ wallet?.meta.name }})</code>
    </n-alert>
    <n-form>
      <transfer-type-select
        @change="(val) => (selectedType = val)"
        @clear="clearType"
      />

      <address-component
        v-if="!forMe"
        v-model="destinationAddress"
        label="Destination address"
      />

      <source-node
        @clear="clearNode"
        @change="(node) => (selectedNode = node)"
      />

      <asset-select
        :selected-node="selectedNode"
        @clear="clearAsset"
        @change="(asset) => (selectedAsset = asset)"
      />

      <destination-node
        :selected-node="selectedNode"
        :selected-asset="selectedAsset"
        @clear="clearDestination"
        @change="(dest) => (selectedDestination = dest)"
      />
      <n-form-item>
        <div class="ammount-wrapper">
          <n-input-number
            v-model:value="balance"
            placeholder="Balance"
            step="0.001"
            min="0"
            :precision="3"
            :disabled="!selectedDestination"
          />
          <n-button type="primary" :disabled="!canSend" @click="onSend">
            Send
          </n-button>
        </div>
      </n-form-item>
    </n-form>
  </n-space>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import {
  NAlert,
  NButton,
  NForm,
  NFormItem,
  NInputNumber,
  NSpace,
} from 'naive-ui'
import AddressComponent from './address-component.vue'
import SourceNode from './source-node.vue'
import AssetSelect from './asset-select.vue'
import DestinationNode from './destination-node.vue'
import TransferTypeSelect from './transfer-type-select.vue'
import type { TransferType } from '~/stores/AssetStore.ts'
/// Notification logic
const notificationStore = useNotificationStore()
/// Wallets logic
const walletStore = useWalletStore()
const wallet = computed(() => walletStore.selected)

const hasWallet = computed(() => !!wallet.value)

/// Assets logic
const assetsStore = useAssetsStore()

const selectedType = ref<TransferType | null>(null)

const selectedNode = ref<TNode | null>(null)

const selectedAsset = ref<number | null>(null)

const selectedDestination = ref<TNode | null>(null)
// Clearing
const clearType = () => {
  selectedNode.value = null
  clearNode()
}
const clearNode = () => {
  assetsStore.selectNode(null)
  selectedAsset.value = null
  clearAsset()
}
const clearAsset = () => {
  selectedDestination.value = null
  clearDestination()
}
const clearDestination = () => {
  balance.value = 0
}

const destinationAddress = ref('')

// Balance logic
const balance = ref(0)

// Send logic
const canSend = computed(
  () =>
    hasWallet.value &&
    selectedNode.value &&
    selectedAsset.value &&
    balance.value > 0
)
const onSend = () => {
  const asset = assetsStore.assetOptions.find(
    (_, index) => index === selectedAsset.value
  )
  if (!asset) {
    notificationStore.create('Invalid asset selected')
    return
  }
  assetsStore.send(
    balance.value,
    asset,
    selectedType.value,
    selectedNode.value!,
    selectedDestination.value!
  )
}
</script>
<style lang="scss">
.ammount-wrapper {
  width: 100%;
  display: flex;
}
</style>
