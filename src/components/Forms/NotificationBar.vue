<!--
Forms/NotificationBar (Universal)


-->

<template>
  <div
    v-if="hasNotification"
    v-html="message"
    :class="['notification-bar', notificationClass]"
  />
</template>

<script>

export default {
  name: 'FormNotificationBar',

  props: {
    message: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
  },

  computed: {
    /**
     * hasNotification - Returns true if there is a message present.
     *
     * @return {Boolean}
     */
    hasNotification() {
      return !!this.message;
    },

    /**
     * notificationClass - Returns a className for notifications based on the
     * type of message shown, `error`, `warning` or `success`.
     *
     * @return {String}
     */
    notificationClass() {
      return `notification-bar--${this.type}`;
    },
  },
};
</script>

<style lang="scss" scoped>
  .notification-bar {
    margin-bottom: 20px;
    padding: 10px 0;
    background-color: grey;
    text-align: center;
    font-size: 14px;
    color: white !important;
  }

  .notification-bar--success {
    background-color: #049544;
  }

  .notification-bar--wanring {
    background-color: orange;
  }

  .notification-bar--error {
    background-color: #D43240;
  }
</style>
