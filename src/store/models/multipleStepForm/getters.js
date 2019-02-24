/**
 * wizardConfig/getters
 *
 * The getter methods of the wizardConfig Vuex module.
 */

export default {
  /**
   * getCurrentConfig - Returns the current wizardConfig details required for the StepWizard.
   *
   * @return {Object}
   */
  getCurrentConfig: state => () => ({
    cancel: {
      action: state.closeAction,
      enabled: state.canCancel,
      text: state.cancelButtonText,
      buttonClass: state.cancelButtonClass,
    },
    next: {
      action: state.validateStep,
      enabled: state.canNext,
      text: state.nextButtonText,
      buttonClass: state.nextButtonClass,
    },
    previous: {
      action: state.prevStep,
      enabled: state.canPrev,
      text: state.previousButtonText,
      buttonClass: state.previousButtonClass,
    },
  }),
};
