<!--
GlobalNavigator (App)

The main top navigator used for navigating between groups and communities, managing
user, accounts and reading notifications
-->
<template>
  <div class="global-navigation">
    <div class="notifications-demo">
      <ul class="ddh--action-group global-navigation-action-group pull-right">
        <navigation-button
          :button-active="isNotificationsActive"
          :button-action="toggleNotificationsDropdown"
        >
          <notifications-dropdown
            v-if="isShowingNotificationsDropdown"
            :user-id="user.id"
            :close="toggleNotificationsDropdown"
          />
          <span
            v-if="isNotificationsActive"
            class="notifications-count-overlay"
          >
            {{ unreadNotificationsCount }}
          </span>
        </navigation-button>
      </ul>
    </div>
  </div>
</template>
<script>

import NavigationButton from './NavigationButton/index.vue';
import NotificationsDropdown from './NotificationsDropdown/index.vue';

export default {
  name: 'GlobalNavigator',

  components: {
    NavigationButton,
    NotificationsDropdown,
  },

  data() {
    return {
      isShowingNotificationsDropdown: false,
      user: { id: 1 },
    };
  },

  computed: {
    /**
    * isNotificationsActive - Are there currently unread notifications
    *
    * @return {Boolean} isNotificationsActive
    */
    isNotificationsActive() {
      return this.unreadNotificationsCount > 0;
    },

    /**
    * unreadNotificationsCount - The number of unread user Notifications
    *
    * @return {Number} unreadNotificationsCount
    */
    unreadNotificationsCount() {
      return this.$store.state.notifications.unreadNotificationsCount;
    },
  },

  methods: {
    /**
    * toggleNotificationsDropdown - Open the list containing the user's
    * notifications
    *
    * @return {Boolean} isShowingNotificationsDropdown
    */
    toggleNotificationsDropdown() {
      this.isShowingNotificationsDropdown = !this.isShowingNotificationsDropdown;
      return this.isShowingNotificationsDropdown;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import './styles/_dropdown_menus.scss';
  .notifications-count-overlay {
    position: absolute;
    border-radius: 7px;
    background-color: #e81225;
    width: 20px;
    height: 20px;
    top: -5px;
    right: 19px;
    color: white;
    text-align: center;
    line-height: 20px;
  }

  .global-navigation {
    position: absolute;
    top: 20%;
    right: 10%;
    background-color: #161616;
    border-radius: 35px;
    width: 17%;
  }

  @media (max-width: 1025px) {
    .global-navigation {
      display: none;
    }
  }
</style>
