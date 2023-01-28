import { ApiPromise, WsProvider } from '@polkadot/api'
import consola from 'consola'
const logger = consola.create({
  defaults: {
    tag: 'store::channel:',
  },
})

export interface Parachain {
  id: number
  name: string
}
type State = {
  parachains: Parachain[]
}

export const useChannelStore = defineStore({
  id: 'channel',
  persist: {
    storage: persistedState.localStorage,
  },
  state: (): State => ({
    parachains: [],
  }),
  actions: {
    async loadParachains(): Promise<void> {
      const wsProvider = new WsProvider('ws://127.0.0.1:9944')
      const api = await ApiPromise.create({ provider: wsProvider })

      // Call to query parachains connected to Relay chain
      const parachainsInfo =
        (await api.query.paras.parachains()) as unknown as Record<
          number,
          { words: Array<number> }
        >
      const parachains = []
      for (const key in parachainsInfo) {
        if (!isNaN(Number(key))) {
          const chainId = parachainsInfo[key].words[0]
          // Here add your new node
          if (chainId === 2001) parachains.push({ id: 2001, name: 'Bifrost' })
          if (chainId === 2000) parachains.push({ id: 2000, name: 'Karura' })
          if (chainId === 2102) parachains.push({ id: 2102, name: 'Pichiu' })
        }
      }
      this.parachains = parachains
    },
    openChannel(sourec: number, destination: number) {
      logger.success(`Opened channel: ${sourec}<->${destination}`)
    },
  },
  getters: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
