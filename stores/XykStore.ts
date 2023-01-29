import consola from 'consola'

const logger = consola.create({
  defaults: {
    tag: 'store::xyk:',
  },
})
type State = {}

export const useXykStore = defineStore({
  id: 'xyk',
  state: (): State => ({}),
  actions: {
    createPool(
      assetA: string,
      amountA: number,
      assetB: string,
      amountB: number
    ) {
      logger.success('Create pool', assetA, amountA, assetB, amountB)
    },
    addLiquidity(
      assetA: string,
      amountA: number,
      assetB: string,
      limit: number
    ) {
      logger.success('Add liquidity', assetA, amountA, assetB, limit)
    },
    removeLiquidity(assetA: string, assetB: string, limit: number) {
      logger.success('Remove liquidity', assetA, assetB, limit)
    },
    buy(
      assetA: string,
      amountA: number,
      assetB: string,
      limit: number,
      discount: boolean
    ) {
      logger.success('Buy', assetA, amountA, assetB, limit, discount)
    },
    sell(
      assetA: string,
      amountA: number,
      assetB: string,
      limit: number,
      discount: boolean
    ) {
      logger.success('Sell', assetA, amountA, assetB, limit, discount)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
