<template>
  <n-form-item
    :label="label"
    :validation-status="getValidationStatus(error)"
    :feedback="error ? error : undefined"
  >
    <n-input
      v-model:value="address"
      placeholder="Address"
      autosize
      style="min-width: 100%"
      @change="handleInput"
    />
  </n-form-item>
</template>
<script lang="ts" setup>
import { checkAddress, isAddress } from '@polkadot/util-crypto'
import { NFormItem, NInput } from 'naive-ui'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  strict: {
    type: Boolean,
    default: false,
  },
  emptyOnError: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmits(['update:modelValue'])

const { urlPrefix } = usePrefix()

const address = ref<string>('')

onMounted(() => {
  address.value = props.modelValue ?? ''
})

const error = ref<string | null>(null)

const getValidationStatus = (error: string | null) =>
  error ? 'error' : 'success'

const ss58Format = computed(() =>
  urlPrefix.value ? ss58Of(urlPrefix.value) : undefined
)
const handleInput = (value: string) => {
  if (props.strict) {
    const [, err] = checkAddress(value, correctAddressFormat(ss58Format.value))
    error.value = value ? err : ''
  } else if (!props.emptyOnError && !value) {
    error.value = ''
  } else {
    error.value = isAddress(value) ? '' : 'Invalid address'
  }
  if (!error.value) {
    emit('update:modelValue', value)
  }
}
</script>
<style lang="scss"></style>
