/**
 * models/address/mutations
 *
 * The mutation methods of the address Vuex module.
 */

export default {
  /**
   * setProperties - Takes and object of keys/values and assigns each to the state if valid.
   *
   * @param  {Object} state   Current state via Vuex
   * @param  {Object} data    The object of updated keys/values to update in the state
   * @return {Array}          An array of updated values current set in the state
   */
  setProperties(state, data) {
    return Object.keys(data).map((key) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = data[key];
      }

      return state[key];
    });
  },
};
