<template>
  <n-form-item>
    <n-select
      v-model:value="selectedAsset"
      :options="assetsOptions"
      class="asset-select"
      placeholder="Select asset"
      :disabled="!selectedNode"
      filterable
      clearable
      @clear="$emit('clear')"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import { NFormItem, NSelect, type SelectOption } from 'naive-ui'
const $emit = defineEmits(['clear', 'change'])
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  selectedNode: TNode | null
}>()

/// Assets logic
const assetsStore = useAssetsStore()

// Asset logic
const availibleAssets = computed(() =>
  assetsStore.assetOptions.map((asset, id) => ({ id, ...asset }))
)

const assetsOptions = computed<SelectOption[]>(() =>
  availibleAssets.value.map(({ symbol, id }) => ({ label: symbol, value: id }))
)
const selectedAsset = ref<number | null>(null)
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
