/**
 * wizardConfig/state
 *
 * The default state of the wizardConfig Vuex module.
 */

export default {
  currentStep: 0,

  canNext: true,
  validateStep: () => false,
  nextButtonText: 'Next',
  nextButtonClass: '',

  canPrev: true,
  prevStep: () => false,
  previousButtonText: 'Previous',
  previousButtonClass: '',

  canCancel: false,
  closeAction: () => false,
  cancelButtonText: 'Cancel',
  cancelButtonClass: '',
  popupModalTitle: '',


  defaultConfig: {},
};
