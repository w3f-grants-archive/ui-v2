import consola from 'consola'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      // switch (type) {
      //   case NotificationType.Info:
      //     logger.info(`creating info notification with ID: ${id}`)
      //     break
      //   case NotificationType.Warning:
      //     logger.warn(`creating warning notification with ID: ${id}`)
      //     break
      //   case NotificationType.Success:
      //     logger.success(`creating success notification with ID: ${id}`)
      //     break
      //   case NotificationType.Error:
      //     logger.error(`creating error notification with ID: ${id}`)
      //     break
      // }
    },
    remove(id: number) {
      this.notifications = this.notifications.filter((n) => n.id === id)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
}
