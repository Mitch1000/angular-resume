/**
 * Address:
 *
 * Used to locally manage an instance of an `addresses` from the database.
 */

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// Export vue module:
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
