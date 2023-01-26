<template>
  <n-form-item>
    <n-select
      v-model:value="selectedType"
      :options="typeOptions"
      class="type-select"
      placeholder="Select transfer type"
      filterable
      clearable
      @clear="$emit('clear')"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { NFormItem, NSelect, type SelectOption } from 'naive-ui'
import { TransferType } from '~~/stores/AssetStore'
const $emit = defineEmits(['change', 'clear'])

const typeOptions: SelectOption[] = [
  { label: 'Relay to Para', value: 'RtP' },
  { label: 'Para to Relay', value: 'PtR' },
  { label: 'Para to Para', value: 'PtP' },
]

const selectedType = ref<TransferType | null>(null)

watch(
  () => selectedType.value,
  (type) => $emit('change', type)
)
</script>
<style lang="scss" scoped>
.asset-select {
  width: 100%;
}
</style>
