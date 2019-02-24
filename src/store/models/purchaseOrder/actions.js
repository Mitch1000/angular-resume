const getMockPurchaseData = () => (
  new Promise(resolve => resolve({ status: 200 })));

/**
 * The action methods of the purchaseOrder Vuex module.
 */
export default {
  /**
  * This generates a secure token generated by stripe so that the user's
  * credit card information can securely be sent to our server.
  */
  attemptToMakePurchase({ commit, getters }, data) {
    commit('setProperties', { isLoading: true });
    return new Promise((resolve, reject) => {
      const sectionsOrderCreatePath = getters.getProperty('sectionsOrderCreatePath');

      getMockPurchaseData(sectionsOrderCreatePath, {
        stripe_token: data.stripeToken,
        section_for_purchase_id: data.sectionForPurchaseId,
        number_of_pages_for_purchase: data.numberOfPagesForPurchase,
        billing_address: data.address,
      }).then((response) => {
        commit('setProperties', { isLoading: false });
        resolve(response);
      }).catch((response) => {
        commit('setProperties', { isLoading: false });
        reject(response);
      });
    });
  },
};
