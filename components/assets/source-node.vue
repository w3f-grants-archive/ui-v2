<template>
  <n-form-item>
    <n-select
      v-model:value="selectedNode"
      :options="nodeOptions"
      class="node-select"
      placeholder="Select node"
      filterable
      clearable
      @update:value="assetsStore.selectNode(selectedNode as TNode)"
      @clear="$emit('clear')"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { TNode } from '@paraspell/sdk'
import {
  NFormItem,
  NSelect,
  type SelectGroupOption,
  type SelectOption,
} from 'naive-ui'
import type { DestinationOption } from '@/stores/AssetStore'

const $emit = defineEmits(['change', 'clear'])

// Node logic
const assetsStore = useAssetsStore()

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
const nodeOptions = computed<Array<SelectOption | SelectGroupOption>>(() => {
  const [availible, unavailible] = splitNodesByAvailibility(
    assetsStore.nodeOptions
  )
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
const selectedNode = ref<TNode | null>(null)

watch(
  () => selectedNode.value,
  (val) => $emit('change', val)
)
</script>
<style lang="scss" scoped>
.node-select {
  width: 100%;
}
</style>
