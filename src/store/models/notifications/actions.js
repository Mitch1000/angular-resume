import { camelizeKeys } from 'humps';
import getNotifications from './notificationsMockData'

export default {

  /**
   * fetch - Makes the paginated API call for a list of notifications
   *
   * @param {Object}  context { commit, state } via vuex
   * @return {Promise} Triggers the API call to fetch groups
   */
  fetch({ state, commit }, userId) {
    const { lastReceivedNotificationId } = state;

    return getNotifications(state.fetchPath, {
      params: {
        user_id: userId,
        last_received_notification_id: lastReceivedNotificationId,
      },
    })
      .then((response) => {
        const { notifications } = response.data;

        commit('setProperties', {
          isPaginating: response.data.is_paginating,
          lastReceivedNotificationId: (notifications[0] || {}).id,
        });

        commit('set', camelizeKeys(notifications));
      })
      .catch(error => console.error(error)) // eslint-disable-line
  },

  update({ state }, id) {
    return new Promise((resolve) => resolve(true));
  },

};
