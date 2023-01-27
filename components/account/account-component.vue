<template>
  <n-button style="margin: 10px" @click="showModal">
    {{ accountStore.selected ? selected : 'Select your account' }}
  </n-button>
  <n-modal v-model:show="modalState">
    <n-card
      style="padding: 5px; width: 300px"
      title="Which account do you want to use?"
      :bordered="false"
      role="dialog"
      aria-modal="true"
      @close="cancelModal"
    >
      <n-space vertical :size="[10, 20]">
        <n-button
          v-for="account in accounts"
          :key="account.meta.name"
          style="width: 100%"
          type="primary"
          @click="selectAccount(account.id)"
        >
          {{ account.meta.source }} ({{ account.meta.name }})
        </n-button>
        <n-button
          v-if="accountStore.selected"
          style="width: 100%"
          @click="disconnectAccount"
        >
          Disconnect account
        </n-button>
        <n-button style="width: 100%" @click="cancelModal"> Cancel </n-button>
      </n-space>
    </n-card>
  </n-modal>
</template>
<script setup lang="ts">
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { NButton, NCard, NModal, NSpace } from 'naive-ui'

const accountStore = useAccountStore()

onMounted(async () => {
  await web3Enable('subscaffold dapp')
  accountStore.setAccounts(await web3Accounts())
})
// Modals logic
const modalState = ref(false)

const showModal = () => {
  modalState.value = true
}

const cancelModal = () => {
  modalState.value = false
}

// Accounts
const accounts = computed(() => accountStore.accounts)

const selectAccount = (id: number) => {
  accountStore.selectAccount(id)
  cancelModal()
}

const disconnectAccount = () => {
  accountStore.disconnectAccount()
  cancelModal()
}

const selected = computed(
  () =>
    `${accountStore.selected?.meta?.source} (${accountStore.selected?.meta?.name})`
)
</script>
