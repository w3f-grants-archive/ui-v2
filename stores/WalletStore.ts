import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import Consola from 'consola'

const logger = Consola.create({
  defaults: {
    tag: 'store::wallet:',
  },
})

interface WalletsWithID extends InjectedAccountWithMeta {
  id: number
}

type State = {
  wallets: WalletsWithID[]
  selected: WalletsWithID | null
  idCounter: number
}

export const useWalletStore = defineStore({
  id: 'wallet',
  state: (): State => ({
    wallets: [],
    selected: null,
    idCounter: 0,
  }),
  actions: {
    /**
     * Fetches the list of wallets from the API
     */
    setWallets(wallets: InjectedAccountWithMeta[]) {
      this.wallets = wallets.map((wallet) => ({
        ...wallet,
        id: this.idCounter++,
      }))
    },
    /**
     * Disconnect current wallet
     */
    disconnectWallet() {
      this.selected = null
    },
    /**
     * Set current wallet
     */
    selectWallet(id: number): void {
      const selected = this.wallets.find((w) => w.id === id)
      if (!selected) {
        logger.error('Cannot locate this wallet', id, this.wallets)
        return
      }
      this.selected = selected
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot))
}
