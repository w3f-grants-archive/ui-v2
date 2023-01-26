import { NODE_NAMES, TAssetDetails, TNode, TNodeAssets } from '@paraspell/sdk'
import consola from 'consola'

const logger = consola.create({
  defaults: {
    tag: 'store::assets:',
  },
})
export const SUPPORTED_NODES = ['Karura', 'BifrostKusama', 'Pichiu']

/**
 * Shortcuts are standing for:
 * PtP -> Para to Para
 * RtP -> Relat to Para
 * PtR -> Para to Relay
 */
export type TransferType = 'PtP' | 'RtP' | 'PtR'

export type DestinationOption = {
  label: string
  value: string
}

type State = {
  assets: TNodeAssets | null
}

export const useAssetsStore = defineStore({
  id: 'assets',
  state: (): State => ({
    assets: null,
  }),
  actions: {
    /**
     * Select node to show assets
     * @param node
     */
    selectNode(node: TNode | null, ptp = false): void {
      const notificationStore = useNotificationStore()
      const { $paraspell } = useNuxtApp()
      // TODO: Do we want BifrostKusama as Relay chain?
      if (!ptp) {
        node = 'BifrostKusama'
      }
      if (!node) {
        return
      }
      this.assets = $paraspell.assets.getAssetsObject(node)
      notificationStore.create('Node selected', `Selected node: ${node}`)
    },
    /**
     * Send a transaction
     * @param balance Amount of tokens
     * @param currencyId Token ID
     */
    send(
      balance: number,
      selectedAsset: TAssetDetails,
      type: TransferType,
      source: string,
      destination: string
    ): void {
      logger.success(
        `send ${source} => ${destination}`,
        balance * 10 ** selectedAsset.decimals,
        selectedAsset,
        type
      )
    },
  },
  getters: {
    nodeOptions: (): DestinationOption[] => {
      return NODE_NAMES.map((name) => ({ value: name, label: name }))
    },
    assetOptions: (state): TAssetDetails[] => {
      // check if assets are loaded
      if (!state.assets) return []
      return [
        ...state.assets.nativeAssets.reduce((acc, value) => {
          acc.push({ assetId: 'native', ...value })
          return acc
        }, [] as TAssetDetails[]),
        ...state.assets.otherAssets,
      ]
    },
    destinationOptions:
      (): Function =>
      (
        symbol: string,
        currentNode: TNode = 'BifrostKusama'
      ): DestinationOption[] => {
        const { $paraspell } = useNuxtApp()
        return NODE_NAMES.filter(
          (node) =>
            node !== currentNode &&
            $paraspell.assets.hasSupportForAsset(node, symbol)
        ).map((name) => ({ value: name, label: name }))
      },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot))
}
