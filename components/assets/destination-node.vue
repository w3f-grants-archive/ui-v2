<template>
  <n-form-item>
    <n-select
      v-model:value="selectedDestination"
      class="destination-select"
      placeholder="Select destination"
      :options="destinationOptions"
      :disabled="!selectedAsset"
      filterable
      clearable
      @clear="$emit('clear')"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import { NFormItem, NSelect } from 'naive-ui'
import type { DestinationOption } from '@/stores/AssetStore'

const props = defineProps<{
  selectedAsset: number | null
  selectedNode: TNode | null
}>()

const $emit = defineEmits(['clear', 'change'])

/// Assets logic
const assetsStore = useAssetsStore()

// Node logic
const splitNodesByAvailibility = (
  nodes: DestinationOption[]
): [DestinationOption[], (DestinationOption & { disabled: boolean })[]] => {
  return nodes.reduce(
    (acc, val) => {
      if (SUPPORTED_NODES.find((symbol) => val.label.startsWith(symbol))) {
        acc[0].push(val)
        return acc
      }
      acc[1].push({ ...val, disabled: true })
      return acc
    },
    [[], []] as [
      DestinationOption[],
      (DestinationOption & { disabled: boolean })[]
    ]
  )
}

// Asset logic
const availibleAssets = computed(() =>
  assetsStore.assetOptions.map((asset, id) => ({ id, ...asset }))
)

// Destination logic
const destinationOptions = computed(() => {
  if (!props.selectedAsset || !props.selectedNode) {
    return []
  }
  const asset = availibleAssets.value.find(
    (asset) => asset.id === props.selectedAsset
  )
  if (!asset) return []
  const nodeOptions = assetsStore.destinationOptions(
    asset.symbol,
    props.selectedNode
  )

  const [availible, unavailible] = splitNodesByAvailibility(nodeOptions)
  return [
    {
      type: 'group',
      label: 'Availible nodes',
      key: 'availible',
      children: availible,
    },
    {
      type: 'group',
      label: 'Unavailable nodes',
      key: 'unavailable',
      children: unavailible,
    },
  ]
})
const selectedDestination = ref<TNode | null>(null)

watch(
  () => selectedDestination.value,
  (val) => {
    $emit('change', val)
  }
)
</script>
<style lang="scss" scoped>
.destination-select {
  width: 100%;
}
</style>
