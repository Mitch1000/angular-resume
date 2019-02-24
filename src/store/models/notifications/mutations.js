import Vue from 'vue';

/**
 * Notifications Store: mutations
 *
 * The mutation functions for the notifications Vuex module.
 */
export default {
  /**
   * set - Appends notifications to the store.
   *
   * @param  {Object} state         Current state (via vuex)
   * @param  {Object} payLoad  { byId, ids } notifications recieved from the API request
   */
  set(state, payLoad) {
    // Updated array of uniq ids using Set()
    const updatedIds = payLoad.map(notification => notification.id);

    // Only update recieved notifications using Vue.set for reactivity:
    updatedIds.forEach(id => Vue
      .set(state.byId, id, payLoad.find(notification => notification.id === id)));
  },

  /**
   * setProperties - Maps over a list of keys and sets the state[key] to the
   * value stored in data[key]. Returns the result of the map.
   *
   * @param  {Object} state Vue object.
   * @param  {Object} data - an object containing the
   * values in state to be updated
   * @return {Array} The values updated
   */
  setProperties(state, data) {
    return Object.keys(data).map((key) => {
      state[key] = data[key];
      return state[key];
    });
  },

  /**
   * markAsRead - Marks single notification as read reactively
   *
   * @param  {Object} state Vue object.
   * @param  {Number} id - The notification id
   * @return {Object} notification
   */
  markAsRead(state, id) {
    return Vue.set(state.byId[id], 'status', 'read');
  },

  /**
   * markAsRead - Marks all notifications as read reactively
   *
   * @param  {Object} state Vue object.
   */
  markAllAsRead(state) {
    return Object.keys(state.byId).map(value =>
      Vue.set(state.byId[value], 'status', 'read'));
  },
};
