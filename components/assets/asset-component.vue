<template>
  <n-space vertical>
    <n-alert title="Current support" type="info">
      Currently supported chains on Paraspell: &nbsp;
      <code>{{ supportedNodes.join(', ') }}</code>
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
      <n-form-item>
        <n-space>
          Send to:
          <n-switch v-model:value="forMe">
            <template #unchecked> Address </template>
            <template #unchecked-icon>
              <n-icon :component="ArrowForwardOutlined" />
            </template>
            <template #checked> Myself </template>
            <template #checked-icon>
              <n-icon :component="ArrowBackOutlined" />
            </template>
          </n-switch>
        </n-space>
      </n-form-item>

      <address-component
        v-if="!forMe"
        v-model="destinationAddress"
        label="Destination address"
      />

      <n-form-item>
        <n-select
          v-model:value="selectedNode"
          :options="nodeOptions"
          class="node-select"
          placeholder="Select node"
          filterable
          clearable
          @update:value="assetsStore.selectNode(selectedNode as TNode)"
          @clear="clearNode"
        />
      </n-form-item>

      <n-form-item>
        <n-select
          v-model:value="selectedAsset"
          :options="assetsOptions"
          class="asset-select"
          placeholder="Select asset"
          :disabled="!selectedNode"
          filterable
          clearable
          @clear="clearAsset"
        />
      </n-form-item>

      <n-form-item>
        <div class="destination-wrapper">
          <n-select
            v-model:value="selectedDestination"
            class="destination-select"
            placeholder="Select destination"
            :options="destinationOptions"
            :disabled="!selectedAsset"
            filterable
            clearable
            @clear="balance = 0"
          />
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
import { ArrowBackOutlined, ArrowForwardOutlined } from '@vicons/material'
import {
  NAlert,
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch,
  SelectOption,
} from 'naive-ui'
import AddressComponent from './address-component.vue'
/// Wallets logic
const walletStore = useWalletStore()
const wallet = computed(() => walletStore.selected)

const hasWallet = computed(() => !!wallet.value)

/// Assets logic
const assetsStore = useAssetsStore()

const supportedNodes = ['Acala', 'Bifrost', 'Kylin']

// Node logic
const nodeOptions = computed(() => assetsStore.nodeOptions)
const selectedNode = ref<TNode | null>(null)

// Asset logic
const availibleAssets = computed(() =>
  assetsStore.assetOptions.map((asset, id) => ({ id, ...asset }))
)

const assetsOptions = computed<SelectOption[]>(() =>
  availibleAssets.value.map(({ symbol, id }) => ({ label: symbol, value: id }))
)
const selectedAsset = ref<number | null>(null)

// Destination logic
const destinationOptions = computed(() => {
  if (!selectedAsset.value || !selectedNode.value) {
    return []
  }
  const asset = availibleAssets.value.find(
    (asset) => asset.id === selectedAsset.value
  )
  if (!asset) return []
  return assetsStore.destinationOptions(asset.symbol, selectedNode.value)
})
const selectedDestination = ref<TNode | null>(null)

const clearNode = () => {
  selectedAsset.value = null
  selectedDestination.value = null
  balance.value = 0
  assetsStore.selectNode(null)
}

const clearAsset = () => {
  selectedDestination.value = null
  balance.value = 0
}

// For me logic
const forMe = ref(false)

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
  const asset = availibleAssets.value.find(
    (asset) => asset.id === selectedAsset.value
  )
  if (!asset) return []
  assetsStore.send(
    balance.value,
    asset,
    forMe.value,
    selectedNode.value!,
    selectedDestination.value!
  )
}
</script>
<style lang="scss">
.node-select,
.asset-select {
  width: 100%;
}

.destination-wrapper {
  width: 100%;
  display: flex;

  .destination-select {
    max-width: 50%;
    margin-right: 1%;
  }
}
</style>
