/**
 * wizardConfig/actions
 *
 * The action methods of the wizardConfig Vuex module.
 */

export default {
  /**
   * initConfig - Initialize the config and set defaultConfig with the result.
   *
   * @param  {Object} context   { commit, getters } via Vuex
   * @param  {Object} config    The initial config setup for wizardConfig
   * @return                    Triggers the setProperties for config and defaultConfig
   */
  initConfig({ commit, getters }, config) {
    commit('setProperties', config);
    return commit('setProperties', { defaultConfig: getters.getCurrentConfig() });
  },

  /**
   * setCurrentStep - Sets the current steps wizardConfig implementation details.
   * newConfig should include: { canNext, validateStep, canPrev, prevStep, canCancel, closeAction }
   *
   * @param  {Object} context     { commit } via Vuex
   * @param  {Object} newConfig   The updated config for the current step
   * @return                      Triggers the setProperties mutation with newConfig
   */
  setCurrentStep({ commit }, newConfig) {
    return commit('setProperties', newConfig);
  },

  /**
   * goToNextStep - Increments the currentStep value by one.
   *
   * @return  Triggers the setProperties mutation with the next curretStep
   */
  goToNextStep({ commit, state }) {
    return commit('setProperties', { currentStep: state.currentStep + 1 });
  },

  /**
   * goToStep - Updates the currentStep index value.
   *
   * @param  {Object}  context   { commit } via Vuex
   * @param  {Integer} index     The index of the step to be rendered, 0 hides the wizard
   * @return                      Triggers the setProperties mutation with new index
   */
  goToStep({ commit }, index) {
    return commit('setProperties', { currentStep: index });
  },

  /**
   * setDefaultConfig - Resets the wizardConfig to the defaultState.
   *
   * @param  {Object} context     { commit } via Vuex
   * @return                      Triggers the setProperties mutation with defaultState
   */
  setDefaultConfig({ commit, state }) {
    return commit('setProperties', state.defaultConfig);
  },
};
