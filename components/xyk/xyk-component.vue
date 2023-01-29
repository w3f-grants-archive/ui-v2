<template>
  <n-space vertical justify="center">
    <n-alert v-if="!hasAccount" title="Select account" type="error">
      You haven't selected any account. Please select your account to continue
      with teleport process.
    </n-alert>
    <n-form>
      <n-form-item label="Select XYK action">
        <n-select
          v-model:value="selectedAction"
          :options="actions"
          @update:value="clear"
        />
      </n-form-item>
      <n-form-item
        v-if="hasAssetA"
        :label="
          selectedAction === 4 || selectedAction === 5
            ? 'Asset you buy'
            : 'Asset A'
        "
      >
        <n-input v-model:value="assetA" placeholder="Asset ID" />
      </n-form-item>
      <n-form-item
        v-if="hasAssetB"
        :label="
          selectedAction === 4 || selectedAction === 5
            ? 'Asset you sell'
            : 'Asset B'
        "
      >
        <n-input v-model:value="assetB" placeholder="Asset ID" />
      </n-form-item>
      <n-form-item
        v-if="hasAmountA"
        :label="
          selectedAction === 4 || selectedAction === 5
            ? 'Amout you want to buy'
            : 'Amount A'
        "
      >
        <n-input-number
          v-model:value="amountA"
          style="width: 100%"
          placeholder="Amount"
          clearable
          min="0"
        />
      </n-form-item>
      <n-form-item
        v-if="hasAmountB"
        :label="selectedAction === 5 ? 'Amout you want to sell' : 'Amount B'"
      >
        <n-input-number
          v-model:value="amountB"
          style="width: 100%"
          placeholder="Amount"
          clearable
          min="0"
        />
      </n-form-item>
      <n-form-item v-if="hasLimit" :label="limitLabel">
        <n-input-number
          v-model:value="limit"
          style="width: 100%"
          placeholder="Limit"
          clearable
          min="0"
        />
      </n-form-item>
      <n-checkbox
        v-if="hasDiscount"
        :checked="discount"
        style="margin-left: 10px"
        @update:checked="(v) => (discount = v)"
      >
        Do you want to apply discount if possible?
      </n-checkbox>
      <n-form-item v-if="selectedAction">
        <n-button
          type="primary"
          style="width: 100%"
          icon-placement="right"
          :disabled="!canSend"
          @click="send"
        >
          Send transaction
          <template #icon>
            <n-icon>
              <send-icon />
            </n-icon>
          </template>
        </n-button>
      </n-form-item>
    </n-form>
  </n-space>
</template>
<script setup lang="ts">
import {
  NSpace,
  NInput,
  NAlert,
  NForm,
  NFormItem,
  NButton,
  NInputNumber,
  NSelect,
  NCheckbox,
  NIcon,
} from 'naive-ui'

import { SendFilled as SendIcon } from '@vicons/material'
/// Account logic
const accountStore = useAccountStore()
const account = computed(() => accountStore.selected)

const hasAccount = computed(() => !!account.value)

const actions = [
  { value: 1, label: 'Create pool' },
  { value: 2, label: 'Add liquidity' },
  { value: 3, label: 'Remove liquidity' },
  { value: 4, label: 'Buy' },
  { value: 5, label: 'Sell' },
]

const selectedAction = ref<number | null>(null)

const hasAssetA = computed(() => selectedAction.value)
const assetA = ref<string>('')

const hasAssetB = computed(() => selectedAction.value)
const assetB = ref<string>('')

const hasAmountA = computed(
  () => selectedAction.value && selectedAction.value !== 3
)
const amountA = ref<number>(0)

const hasAmountB = computed(() => selectedAction.value === 1)
const amountB = ref<number>(0)

const hasLimit = computed(
  () => selectedAction.value && selectedAction.value !== 1
)
const limitLabel = computed<string>(() =>
  selectedAction.value === 2
    ? 'Max limit of asset B'
    : selectedAction.value === 3
    ? 'How much liquidity you wish to remove'
    : selectedAction.value === 4
    ? 'Max limit you want to give'
    : 'Max limit you want to provide'
)
const limit = ref<number>(0)

const hasDiscount = computed(
  () => selectedAction.value === 4 || selectedAction.value === 5
)
const discount = ref<boolean>(false)

const clear = () => {
  assetA.value = ''
  assetB.value = ''
  amountA.value = 0
  amountB.value = 0
  limit.value = 0
  discount.value = false
}

const canSend = computed<boolean>(() => {
  switch (selectedAction.value) {
    case 1:
      return (
        !!assetA.value && !!amountA.value && !!assetB.value && !!amountB.value
      )
    case 2:
      return (
        !!assetA.value && !!amountA.value && !!assetB.value && !!limit.value
      )
    case 3:
      return !!assetA.value && !!assetB.value && !!limit.value
    case 4:
      return (
        !!assetA.value &&
        !!amountA.value &&
        !!assetB.value &&
        !!limit.value &&
        !!discount.value
      )
    case 5:
      return (
        !!assetA.value &&
        !!amountA.value &&
        !!assetB.value &&
        !!limit.value &&
        !!discount.value
      )
  }
  return false
})

const xykStore = useXykStore()
const send = () => {
  switch (selectedAction.value) {
    case 1:
      xykStore.createPool(
        assetA.value,
        amountA.value,
        assetB.value,
        amountB.value
      )
      break
    case 2:
      xykStore.addLiquidity(
        assetA.value,
        amountA.value,
        assetB.value,
        limit.value
      )
      break
    case 3:
      xykStore.removeLiquidity(assetA.value, assetB.value, limit.value)
      break
    case 4:
      xykStore.buy(
        assetA.value,
        amountA.value,
        assetB.value,
        limit.value,
        discount.value
      )
      break
    case 5:
      xykStore.sell(
        assetA.value,
        amountA.value,
        assetB.value,
        limit.value,
        discount.value
      )
      break
  }
}
</script>
<style lang="scss"></style>
