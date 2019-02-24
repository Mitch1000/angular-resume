/**
 * Purchase Order Store
 *
 * Compiles the purchase-order mutations, getters and state into one Vuex module.
 */
import initialState from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state: initialState,
  mutations,
  getters,
  actions,
};
