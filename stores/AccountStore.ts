import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import consola from 'consola'

const logger = consola.create({
  defaults: {
    tag: 'store::account:',
  },
})

interface AccountWithID extends InjectedAccountWithMeta {
  id: number
}

type State = {
  accounts: AccountWithID[]
  selected: AccountWithID | null
  idCounter: number
}

export const useAccountStore = defineStore({
  id: 'account',
  state: (): State => ({
    accounts: [],
    selected: null,
    idCounter: 0,
  }),
  actions: {
    /**
     * Set the list of accounts from the API
     */
    setAccounts(accounts: InjectedAccountWithMeta[]) {
      this.accounts = accounts.map((account) => ({
        id: this.idCounter++,
        ...account,
      }))
    },
    /**
     * Disconnect current account
     */
    disconnectAccount() {
      this.selected = null
    },
    /**
     * Set current account
     */
    selectAccount(id: number): void {
      const selected = this.accounts.find((w) => w.id === id)
      if (!selected) {
        logger.error('Cannot locate this account', id, this.accounts)
        return
      }
      this.selected = selected
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
