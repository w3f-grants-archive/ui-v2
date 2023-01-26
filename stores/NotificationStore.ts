import consola from 'consola'

const logger = consola.create({
  defaults: {
    tag: 'store::notification:',
  },
})

export enum NotificationType {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

export interface Notification {
  id: number
  title: string
  message: string
  type: NotificationType
  duration?: number
  showed?: boolean
}

type State = {
  notifications: Notification[]
  idCounter: number
}

export const useNotificationStore = defineStore({
  id: 'notification',
  state: (): State => ({
    notifications: [],
    idCounter: 0,
  }),
  actions: {
    create(
      title: string,
      message = '',
      type: NotificationType = NotificationType.Info,
      duration = 2000
    ) {
      const id = this.idCounter++
      this.notifications = [
        ...this.notifications,
        {
          id,
          title,
          message,
          type,
          duration,
        },
      ]
      logger.info(`creating notification with ID: ${id}`)
    },
    remove(id: number) {
      this.notifications = this.notifications.filter((n) => n.id === id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
}
