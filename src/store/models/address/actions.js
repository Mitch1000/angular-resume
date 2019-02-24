/**
 * models/address/actions
 *
 * The action methods of the address Vuex module.
 */
const fetchStatesMockData = () => (
  new Promise((resolve) => {
    resolve([
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Northwest Territories',
      'Nova Scotia',
      'Nunavut',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Yukon Territory',
    ]);
  })
);

export default {
  /**
   * fetchStates - Fetches the states/provinces for a country from the server.
   *
   * @param  {Object} context   { commit, dispatch } via Vuex
   * @param  {String} country   Currently only 'ca' or 'us' are supported
   * @return {Promise}          Result triggers handleFetchStatesSuccess or handleFetchStatesError
   */
  fetchStates({ dispatch }, country) {
    dispatch('startLoading');

    return fetchStatesMockData(`/addresses/states/${country}.json`)
      .then(response => dispatch('handleFetchStatesSuccess', response))
      .catch(error => dispatch('handleFetchStatesError', error))
      .finally(() => dispatch('stopLoading'));
  },

  /**
   * handleFetchStatesSuccess - When fetchStates succeeds, update the state with the new array.
   *
   * @param  {Object} context   { commit, dispatch } via Vuex
   * @param  {Object} response  Full server response
   * @return                    Dispatches the setProperties action
   */
  handleFetchStatesSuccess({ commit }, response) {
    const states = response.data;

    return commit('setProperties', { states });
  },

  /**
   * handleFetchStatesError - When fetchStates fails, return and log the error.
   *
   * @param  {Object} context       { dispatch } via Vuex
   * @param  {Object} errorResponse Response from the server
   * @return {Object}               Returns the full errorResponse object
   */
  handleFetchStatesError(context, errorResponse) {
    // Log out the error for anyone watching the console:
    console.log(errorResponse); // eslint-disable-line
    console.error(errorResponse); // eslint-disable-line

    return errorResponse;
  },

  /**
   * startLoading - Sets local loading state to true
   *
   * @param  {Object} context  { commit } from vuex action API
   * @return                   Triggers the `setProperties` mutation
   */
  startLoading({ commit }) {
    return commit('setProperties', { isLoading: true });
  },

  /**
   * stopLoading - Sets local loading state to false
   *
   * @param  {Object} context  { commit } from vuex action API
   * @return                   Triggers the `setProperties` mutation
   */
  stopLoading({ commit }) {
    return commit('setProperties', { isLoading: false });
  },
};
