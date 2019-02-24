/*
  Global Navigator

  Dropdown on the main page used for showing the Notifications menu,
  User actions menu and navigating between groups and communities
*/

import Vue from 'vue';
import Vuex from 'vuex';

import GlobalNavigator from './GlobalNavigator/app.vue';
import globalNavigatorStore from './store/apps/GlobalNavigator';

Vue.use(Vuex);

const store = new Vuex.Store(globalNavigatorStore);

new Vue({ // eslint-disable-line no-new
  el: '#notifications-vue-app',
  store,

  beforeMount() {
    // Get the intial notifications and groups API path from $el and save it in the store:
    const unreadNotificationsCount = this.$el.attributes['data-unread-notifications-count'].value;

    this.$store.commit('notifications/setProperties', {
      unreadNotificationsCount,
    });
  },
  render(createElement) {
    return createElement(GlobalNavigator);
  },
});
