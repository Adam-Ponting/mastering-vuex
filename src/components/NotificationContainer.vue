<template>
  <div class="notification-container">
    <!-- v-for notifications array -->
    <!-- :key is id -->
    <!-- prop passed in is the notifications object -->
    <notification-bar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import NotificationBar from '@/components/NotificationBar.vue'
import { mapState } from 'vuex'
export default {
  components: {
    NotificationBar
  },
  computed: mapState('notification', ['notifications']) // map to 'notification' module, ['notifications'] state
}
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>
