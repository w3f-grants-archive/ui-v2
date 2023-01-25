import { Prefix } from '@/types/config'

type State = {
  urlPrefix?: Prefix
  darkTheme: boolean
}

export const useMainStore = defineStore({
  id: 'main',
  persist: {
    storage: persistedState.localStorage,
  },
  state: (): State => ({
    darkTheme: false,
  }),
  actions: {
    changeTheme(): void {
      this.darkTheme = !this.darkTheme
    },
  },
  getters: {
    // if you need you can implement your prefix
    currentUrlPrefix(): Prefix | undefined {
      return this.urlPrefix
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot))
}
