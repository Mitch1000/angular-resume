/**
 * Credit Card Store: getters
 *
 * The getter methods of the credit-card Vuex module.
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

  cardExpiryMonth: state => () => state.cardExpiry.substring(0, 2),

  cardExpiryYear: state => () => state.cardExpiry.split('/').pop(),

  cardBrand: state => () => state.stripeTokenData.card.brand,

  lastFourDigits: state => () => state.stripeTokenData.card.last4,
};
