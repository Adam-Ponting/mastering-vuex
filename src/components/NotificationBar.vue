<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      // start a timeout on mounted
      // call the remove action, send in this.notification
      this.remove(this.notification)
    }, 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  /*   beforeDestroy() {
    clearTimeout(this.timeout)
    // future proofs to avoid memory leak
    // This will make sure we avoid a memory leak by not leaving the setTimeout running if this component isn’t being actively displayed.
    // It’s considered a JavaScript anti-pattern to not clear out your setTimeouts for this reason.
  },
 */ computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}` // return -text-error or -text-success
    }
  },
  methods: mapActions('notification', ['remove']) // bring in the remove action from the notification module
}
</script>

<style lang="scss" scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
