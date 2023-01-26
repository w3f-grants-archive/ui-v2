<template>
  <n-layout>
    <navbar-component />
    <n-layout-content content-style="padding: 2% 5%;">
      <n-space vertical size="large">
        <slot />
      </n-space>
    </n-layout-content>
    <n-layout-footer>
      <footer-component />
    </n-layout-footer>
  </n-layout>
</template>
<script setup lang="ts">
import {
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NSpace,
  useNotification,
} from 'naive-ui'
import type { Notification } from '~~/stores/NotificationStore'
const $notifications = useNotification()
const notificationStore = useNotificationStore()

const createNotification = (notification: Notification) => {
  $notifications.create({
    title: notification.title,
    description: notification.message,
    type: notification.type,
    duration: notification.duration,
  })
  setTimeout(
    () => notificationStore.remove(notification.id),
    notification.duration
  )

  notification.showed = true
}

watch(
  () => notificationStore.notifications,
  (values) => {
    values.forEach((notification) => {
      !notification.showed && createNotification(notification)
    })
  }
)
</script>
