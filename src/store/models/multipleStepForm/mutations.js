/**
 * wizardConfig/mutations
 *
 * The mutation methods of the wizardConfig Vuex module.
 */

export default {
  /**
   * setPropertyies - Accepts an object of key/values and updates each.
   *
   * @param  {Object} state The current state via vuex
   * @param  {Object} data  The key/value pairs that will be updated
   * @return {Array}        An array of updated values from the state
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
