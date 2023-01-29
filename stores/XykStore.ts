import { Builder } from '@paraspell/sdk'
import {
  ApiPromise,
  Keyring,
  SubmittableResult,
  WsProvider,
} from '@polkadot/api'
import { web3FromAddress } from '@polkadot/extension-dapp'
import consola from 'consola'
import { Account } from './AccountStore'

const logger = consola.create({
  defaults: {
    tag: 'store::xyk:',
  },
})
type State = {
  running: boolean
}

export const useXykStore = defineStore({
  id: 'xyk',
  state: (): State => ({
    running: false,
  }),
  actions: {
    updateHandler({ status }: SubmittableResult, type: string) {
      const notificationStore = useNotificationStore()
      if (status.isInBlock) {
        this.running = false
        notificationStore.create(
          'Success',
          `${type} with hash ${status.asInBlock}`,
          NotificationType.Success
        )
        logger.success(`Successful ${type} with hash ${status.asInBlock}`)
      } else {
        notificationStore.create(
          'Update',
          `${type} update: ${status.type}`,
          NotificationType.Info
        )
        logger.success(`${type} update: ${status.type}`)
      }
    },
    async createPool(
      assetA: number,
      amountA: number,
      assetB: number,
      amountB: number,
      account: Account
    ): Promise<void> {
      this.running = true

      const wsProvider = new WsProvider('ws://127.0.0.1:9988')
      const api = await ApiPromise.create({ provider: wsProvider })
      const extrinsic = Builder(api)
        .createPool()
        .assetA(assetA)
        .amountA(amountA)
        .assetB(assetB)
        .amountB(amountB)
        .build()

      if (account.dev) {
        const keyring = new Keyring({ type: 'sr25519' })
        extrinsic.signAndSend(keyring.createFromUri(account.address), (res) =>
          this.updateHandler(res, 'create pool')
        )
        return
      }
      const injector = await web3FromAddress(account.address)
      extrinsic.signAndSend(
        account.address,
        { signer: injector.signer },
        (res) => this.updateHandler(res, 'create pool')
      )
    },
    async addLiquidity(
      assetA: number,
      amountA: number,
      assetB: number,
      limit: number,
      account: Account
    ) {
      this.running = true

      const wsProvider = new WsProvider('ws://127.0.0.1:9988')
      const api = await ApiPromise.create({ provider: wsProvider })
      const extrinsic = Builder(api)
        .addLiquidity()
        .assetA(assetA)
        .assetB(assetB)
        .amountA(amountA)
        .amountBMaxLimit(limit)
        .build()

      if (account.dev) {
        const keyring = new Keyring({ type: 'sr25519' })
        extrinsic.signAndSend(keyring.createFromUri(account.address), (res) =>
          this.updateHandler(res, 'add liquidity')
        )
        return
      }
      const injector = await web3FromAddress(account.address)
      extrinsic.signAndSend(
        account.address,
        { signer: injector.signer },
        (res) => this.updateHandler(res, 'create pool')
      )
    },
    async removeLiquidity(
      assetA: number,
      assetB: number,
      limit: number,
      account: Account
    ) {
      this.running = true

      const wsProvider = new WsProvider('ws://127.0.0.1:9988')
      const api = await ApiPromise.create({ provider: wsProvider })
      const extrinsic = Builder(api)
        .removeLiquidity()
        .assetA(assetA)
        .assetB(assetB)
        .liquidityAmount(limit)
        .build()

      if (account.dev) {
        const keyring = new Keyring({ type: 'sr25519' })
        extrinsic.signAndSend(keyring.createFromUri(account.address), (res) =>
          this.updateHandler(res, 'remove liquidity')
        )
        return
      }
      const injector = await web3FromAddress(account.address)
      extrinsic.signAndSend(
        account.address,
        { signer: injector.signer },
        (res) => this.updateHandler(res, 'remove liquidity')
      )
    },
    async buy(
      assetA: number,
      amountA: number,
      assetB: number,
      limit: number,
      discount: boolean,
      account: Account
    ) {
      this.running = true

      const wsProvider = new WsProvider('ws://127.0.0.1:9988')
      const api = await ApiPromise.create({ provider: wsProvider })
      const extrinsic = Builder(api)
        .buy()
        .assetOut(assetA)
        .assetIn(assetB)
        .amount(amountA)
        .maxLimit(limit)
        .discount(discount ? 'Yes' : 'No')
        .build()

      if (account.dev) {
        const keyring = new Keyring({ type: 'sr25519' })
        extrinsic.signAndSend(keyring.createFromUri(account.address), (res) =>
          this.updateHandler(res, 'buy')
        )
        return
      }
      const injector = await web3FromAddress(account.address)
      extrinsic.signAndSend(
        account.address,
        { signer: injector.signer },
        (res) => this.updateHandler(res, 'buy')
      )
    },
    async sell(
      assetA: number,
      amountA: number,
      assetB: number,
      limit: number,
      discount: boolean,
      account: Account
    ) {
      this.running = true

      const wsProvider = new WsProvider('ws://127.0.0.1:9988')
      const api = await ApiPromise.create({ provider: wsProvider })
      const extrinsic = Builder(api)
        .sell()
        .assetIn(assetB)
        .assetOut(assetA)
        .amount(amountA)
        .maxLimit(limit)
        .discount(discount ? 'Yes' : 'No')
        .build()

      if (account.dev) {
        const keyring = new Keyring({ type: 'sr25519' })
        extrinsic.signAndSend(keyring.createFromUri(account.address), (res) =>
          this.updateHandler(res, 'sell')
        )
        return
      }
      const injector = await web3FromAddress(account.address)
      extrinsic.signAndSend(
        account.address,
        { signer: injector.signer },
        (res) => this.updateHandler(res, 'sell')
      )
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
