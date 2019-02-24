
const mockStripeResponse = () => ({
  card: {
    brand: 'Visa',
    number: '411111111111',
    last4: '1111',
  },
});

/**
 * models/credit-card/actions
 *
 * The action methods of the credit-card Vuex module.
 */
export default {
  /**
  * This generates a secure token generated by stripe
  * so that the user's credit card information can securely be sent to our server.
  */
  generateStripeCreditCardToken({ commit, getters }) {
    /**
    * This function is here to get the values taken from the
    * credit card form and format those values
    * into the exact params required by stripe.
    */
    const getFormattedCardDataForStripe = () => (
      {
        number: getters.getProperty('cardNumber'),
        exp_month: getters.cardExpiryMonth(),
        exp_year: getters.cardExpiryYear(),
        cvc: getters.getProperty('cardCvc'),
        address_zip: getters.getProperty('postalCode'),
      }
    );

    /**
    * Return the stripe response in a promise so we don't
    * move to the next step until stripe has responsed
    */
    return new Promise((resolve, reject) => {
      /**
      * This is here handle the fetch from stripe after it has happened
      */
      const handleStripeResponse = (status, result) => {
        /**
        * This is here to give the user and the programmer valuable information
        * if the stripe server returns an error.
        */
        const handleStripeError = () => {
          console.error(result.error); // eslint-disable-line
          commit('setProperties', { isLoading: false });
          reject(result);
        };

        const handleStripeSuccess = () => {
          commit('setProperties', { stripeTokenData: result, isLoading: false });
          resolve(result);
        };

        return result.error
          ? handleStripeError()
          : handleStripeSuccess();
      };

      commit('setProperties', { isLoading: true });
      // Stripe.createToken(getFormattedCardDataForStripe(), handleStripeResponse)
      handleStripeResponse(200, mockStripeResponse());
    });
  },
};
