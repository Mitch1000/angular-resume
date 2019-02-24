/**
 * Purchase Order: getters
 *
 * The getter methods of the purchase-order Vuex module.
 */

// Export vue module:
export default {
  /**
   * getProperty - Returns the value of `key` from the current address state.
   *
   * @param   {String} key  The key of the property to be returned
   * @return                The value of state[key]
   */
  getProperty: state => key => state[key],

  price: state => () => {
    const { price } = state.purchaseOptions.find(purchaseOption => (
      purchaseOption.value === state.currentSelection));

    return price;
  },
};
