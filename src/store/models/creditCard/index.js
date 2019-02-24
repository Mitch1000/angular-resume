/**
 * Credit Card Store
 *
 * Compiles the credit-card actions, mutations, getters and state into one Vuex module.
 */
import initialState from './state.js';
import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

export default { 
  namespaced: true,
  state: initialState,
  mutations,
  getters,
  actions 
};
