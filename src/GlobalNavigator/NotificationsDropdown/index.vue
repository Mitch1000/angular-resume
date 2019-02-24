<!--
NotificaitonsDropdown

A list displaying all notifications for a particular user.
-->
<template>
  <dropdown-box
    id="dropdown-box"
    ref="dropdownBox"
    :close="close"
    :on-scroll-to-bottom="fetchAdditionalNotifications"
  >
    <li class="notifications-control-bar">
      <div class="centered-item">
        <a @click="markAllNotificationsAsRead">Mark All as Read</a>
      </div>
    </li>

    <li
      v-if="isLoading"
      class="gn--menu-item"
    >
      <div class="centered-item">
        <circle-loader :size="40" color="#161616"/>
      </div>
    </li>

    <li
      v-for="notification in notifications"
      v-else
      :class="{ 'notification--item-read': notification.status == 'read' }"
      :key="notification.id"
      class="notification--item"
    >
      <a
        :href="notification.clickActionUrl"
        class="notification--item-link"
        @click="() => markNotificationAsRead(notification.id)"
      >
        <div class="notification--item-container">
          <div class="notification--item-thumbnail">
            <img :src="notification.thumbnailUrl"></img>
          </div>
          <div>
            <div class="notification--item-title">{{ notification.name }}</div>
            <div>{{ notification.description }}</div>
            <div
              :class="{ 'notification--item-time-read': notification.status == 'read' }"
              class="notification--item-time"
            >
              <span class="notifications-status-indicator">
                <i
                  :class="{
                    'fa fa-envelope-open-o': notification.status === 'read',
                    'fa fa-envelope': notification.status !== 'read'
                  }"
                  class="material-icons"
                >
                </i>
              </span>
              {{ notification.timeSinceCreated }}
            </div>
          </div>
        </div>
      </a>
    </li>

    <li
      v-if="!notifications[0] && !isLoading"
      class="gn--menu-item"
    >
      <div class="menu--item-title">
        <div
          class="gn--menu-centered-item"
          style="width: 100%;"
        >
          No Notifications So Far...
        </div>
      </div>
    </li>

    <li
      v-if="isPaginating"
      class="gn--menu-item"
    >
      <div class="centered-item">
        <circle-loader :size="30" color="#161616"/>
      </div>
    </li>

  </dropdown-box>
</template>

<script>
import { mapState } from 'vuex';
import DropdownBox from '../DropdownBox/index.vue';
import CircleLoader from '../../components/CircleLoader/index.vue';

export default {
  name: 'NotificaitonsDropdown',

  components: {
    DropdownBox,
    CircleLoader,
  },

  props: {
    userId: Number,
    close: {
      type: Function,
      default: () => false,
    },
  },

  data() {
    return {
      isFetchingMoreNotifications: false,
    };
  },

  computed: mapState({
    isLoading: state => state.notifications.isLoading,
    notifications: state => Object.values(state.notifications.byId).reverse(),
    isPaginating: state => state.notifications.isPaginating,
    unreadNotificationsCount: state => state.notifications.unreadNotificationsCount,
  }),

  created() {
    if (Object.keys(this.notifications || {}).length > 0) { return; }

    this.$store.commit('notifications/setProperties', { isLoading: true });
    this.$store.dispatch('notifications/fetch', this.userId)
      .finally(() => this.$store.commit('notifications/setProperties', { isLoading: false }));
  },

  methods: {
    /**
    * fetchAdditionalNotifications - Get more notificaitons if paginating,
    * not currently fetching notifications and the user has scrolled to the bottom
    * of the notifications bar.
    *
    * @return {Promise} Notifications fetch promise
    */
    fetchAdditionalNotifications() {
      if (!this.isPaginating || this.isFetchingMoreNotifications) { return; }

      this.isFetchingMoreNotifications = true;
      this.$store.dispatch('notifications/fetch', this.userId)
        .finally(() => { this.isFetchingMoreNotifications = false; });
    },

    /**
    * markAllNotificationsAsRead -  Set the status of all notifications
    * as read in the database and reactivley in the ui
    *
    * @return {Array} Notifications
    */
    markAllNotificationsAsRead() {
      console.log(this.notifications);
      // update unread notifications count
      if (this.$store.state.notifications.unreadNotificationsCount <= 0) {
        return this.$store.commit('notifications/markAllAsRead');
      }
      this.$store.commit('notifications/setProperties', { unreadNotificationsCount: 0 });
      this.$store.dispatch('notifications/update');
      return this.$store.commit('notifications/markAllAsRead');
    },

    /**
    * markAllNotificationsAsRead -  Set the status of one notification
    * as read in the database and reactivley in the ui
    *
    * @return {Number} id - The id of the notification
    * @return {Array} Notifications
    */
    markNotificationAsRead(id) {
      console.log(this.unreadNotificationsCount);
      this.$store.commit('notifications/setProperties', { unreadNotificationsCount: this.unreadNotificationsCount - 1 });
      console.log(this.unreadNotificationsCount);
      this.$store.dispatch('notifications/update', id);
      return this.$store.commit('notifications/markAsRead', id);
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '../styles/_navigation.scss';

  @mixin clearfix {
      &:after {
        display: table;
        clear: both;
        content: '';
      }
  }

  @mixin transition($transition...) {
    -webkit-transition: $transition;
         -o-transition: $transition;
            transition: $transition;
  }

  .centered-item {
    text-align: center;
  }

  .notification--item:last-child {
    border-radius: 5px;
  }

  .notification--item {
     position: relative;
     padding: 10px 15px 10px 15px;
     width: 430px;
     border-bottom: solid 1px lightgrey;
     @include transition(background-color .2s);
     @include clearfix;
     &:hover {
       background-color: rgb(230, 230, 230);
     }
  }

  .notification--item-thumbnail img {
    max-width: 100%;
    border-radius: 100px;
    display: block;
  }

  .notification--item-thumbnail {
    max-width: 50px;
    min-width: 50px;
    padding-right: 15px;
    float: left;
    position: relative;
  }

  .notification--item-read {
    background-color: rgb(245, 245, 245);
  }

  .notification--item-link {
    color: rgb(105, 105, 105);
    font-weight: 300;
  }

  .notification--item-title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .notification--item-container {
    display: flex;
    align-items: center;
    white-space: normal;
  }

  .notification--item-time {
    margin-top: 5px;
    font-weight: 400;
    color: dimgrey;
  }

  .notification--item-time-read {
    color: rgb(160,160,160);
    font-weight: 200;
  }

  .notifications-control-bar {
    border-bottom: solid 1px lightgrey;
    padding: 5px 15px 5px 15px;
  }

  .notifications-control-bar > div > a {
    cursor: pointer;
  }

  .notifications-status-indicator {
    display: inline-block;
    margin-right: 2px;
  }

  .notifications-status-indicator > i {
    font-size: 16px;
  }
</style>
