/**
 * Purchase Order Store: mutations
 *
 * The mutation methods for the purchase-order Vuex module.
 */
export default {
  /**
   * setProperties - Takes and object of key/values and assigns each to the state.
   *
   * @param  {Object} state   Current state via Vuex
   * @param  {Object} data    The object of updated values
   * @return {Array}          An array of updated values
   */
  setProperties(state, data) {
    return Object.keys(data).map((key) => {
      state[key] = data[key];
      return state[key];
    });
  },

};
