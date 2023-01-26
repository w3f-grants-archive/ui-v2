<template>
  <n-form-item label="Select asset">
    <n-select
      v-model:value="selectedAsset"
      :options="assetsOptions"
      class="asset-select"
      placeholder="Select asset"
      :disabled="isDisabled"
      filterable
      clearable
      @clear="$emit('clear')"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import { NFormItem, NSelect, type SelectOption } from 'naive-ui'
import { TransferType } from '~~/stores/AssetStore'
const $emit = defineEmits(['clear', 'change'])

const props = defineProps<{
  selectedNode: TNode | null
  asset: number | null
  transferType: TransferType | null
}>()

/// Assets logic
const assetsStore = useAssetsStore()

const availibleAssets = computed(() =>
  assetsStore.assetOptions.map((asset, id) => ({ id, ...asset }))
)

const isDisabled = computed(() => {
  if (props.transferType === 'PtP') return !props.selectedNode
  return false
})

const assetsOptions = computed<SelectOption[]>(() =>
  availibleAssets.value.map(({ symbol, id }) => ({ label: symbol, value: id }))
)
const selectedAsset = ref<number | null>(null)
watch(
  () => props.asset,
  (val) => (selectedAsset.value = val)
)

watch(
  () => selectedAsset.value,
  (val) => {
    $emit('change', val)
  }
)
</script>
<style lang="scss" scoped>
.asset-select {
  width: 100%;
}
</style>
