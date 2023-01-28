<template>
  <n-space vertical justify="center">
    <n-alert v-if="!hasAccount" title="Select account" type="error">
      You haven't selected any account. Please select your account to continue
      with teleport process.
    </n-alert>
    <n-form>
      <n-form-item label="Select XYK action">
        <n-select />
      </n-form-item>
      <n-form-item label="Asset ID you sell">
        <n-input />
      </n-form-item>
      <n-form-item label="Asset ID you buy">
        <n-input />
      </n-form-item>
      <n-form-item label="Amount">
        <n-input-number style="width: 100%" clearable min="0" />
      </n-form-item>
      <n-form-item label="Max limit">
        <n-input-number style="width: 100%" clearable min="0" />
      </n-form-item>
      <n-checkbox style="margin-left: 10px">
        Do you want to apply discount if possible?
      </n-checkbox>
      <n-form-item>
        <n-button type="primary" style="width: 100%">Send transaction</n-button>
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
} from 'naive-ui'
/// Account logic
const accountStore = useAccountStore()
const account = computed(() => accountStore.selected)

const hasAccount = computed(() => !!account.value)
</script>
<style lang="scss"></style>
