<!--
   Purchase Modal
-->
<template>
  <div id="purchase-wizard">
    <transition name="fade">
      <div
        class="purchase-modal-example"
      >
        <multiple-step-form>
          <component
            :set-after-form-validation-action="setAfterFormValidationAction"
            :is="getWizardSteps()[currentStep]"
            ref="activeStepComponent"
          />

          <div
            v-if="isPurchaseComplete && isPurchaseCompletedSuccessfully"
            slot="footer"
          >
            <wizard-footer>
            </wizard-footer>
          </div>

        </multiple-step-form>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CircleLoader from '../../components/CircleLoader/index.vue';
import PopupModal from '../../components/PopupModal/index.vue';
import MultipleStepForm from '../../components/MultipleStepForm/index.vue';
import WizardFooter from '../../components/MultipleStepForm/WizardFooter.vue';

import SectionPurchaseSelectionStep from './ModalSteps/section_purchase_selection_step.vue';
import CreditCardInformationStep from './ModalSteps/credit_card_information_step.vue';
import OrderConfirmationStep from './ModalSteps/order_confirmation_step.vue';
import ReviewStep from './ModalSteps/review_step.vue';

export default {
  name: 'PurchaseModal',

  components: {
    PopupModal,
    MultipleStepForm,
    CircleLoader,
    WizardFooter,

    // Purchase steps:
    SectionPurchaseSelectionStep,
    CreditCardInformationStep,
    OrderConfirmationStep,
    ReviewStep,
  },

  props: {
    toggleOnClose: {
      type: Function,
      default: () => false,
    },
  },

  computed: Object.assign(mapState({
    isLoading: state => state.creditCard.isLoading || state.purchaseOrder.isLoading,

    popupModalTitle: state => state.wizardConfig.popupModalTitle,

    currentStep: state => state.wizardConfig.currentStep,
    nextButtonText: state => state.wizardConfig.nextButtonText,
  }), {
    /**
    * isPurchaseComplete - This is here to determine if the user has already
    * purchased an item and is therefore able to access the purchased item.
    *
    * @returns {Boolean} Can the user access their purchased item.
    */
    isPurchaseComplete() {
      return true;
    },

    /**
    * Can this user make a purchase?
    *
    * @returns {Boolean} Have all the available sections been purchased
    */
    isAllSectionsPurchased() {
      return this.$store.getters['purchaseOrder/getProperty']('isAllItemsPurchased');
    },

    /**
    * Is the step wizard on it's last step
    *
    * @returns {Boolean}
    */
    isPurchaseCompletedSuccessfully() {
      const purchaseHadError = this.$store.state.purchaseOrder.hasError;
      const wizardSteps = this.getWizardSteps();
      const isLastStep = wizardSteps[wizardSteps.length - 1] === wizardSteps[this.currentStep];
      return isLastStep && !purchaseHadError;
    },
  }),

  created() {
    this.setupStepWizard();
  },

  methods: {
  /**
   * This function is here to setup the step wizard on initialization
   */
    setupStepWizard() {
      const defaultConfig = {
        closeAction: this.closeAction,
        validateStep: this.validateStep,
        prevStep: this.prevStep,
        cancelButtonText: 'Begin Later',
        canCancel: true,
        canNext: true,
        canPrev: false,
        currentStep: 0,
        nextButtonText: 'Next',
      };

      this.$store.commit('wizardConfig/setProperties', {
        popupModalTitle: 'Enter Your Payment Information',
      });

      return this.$store.commit('wizardConfig/setProperties', Object.assign({}, defaultConfig, { defaultConfig }));
    },

    /**
    * This is here to define the components that will be shown for each step in the step wizard
    */
    getWizardSteps() {
      return [
        'SectionPurchaseSelectionStep',
        'CreditCardInformationStep',
        'ReviewStep',
        'OrderConfirmationStep',
      ];
    },

    closeAction() {
      this.toggleOnClose();
    },

    /**
    * This is here allow the step wizard to perform an action after the form has been validated
    * This function is available to all steps
    */
    setAfterFormValidationAction(action) {
      this.afterFormValidationAction = action;
    },

    /**
    * Proceeds to the next wizard step
    */
    nextStep(event) {
      this.preventEventDefaultAction(event);
      this.setAfterFormValidationAction(null);

      let nextStepIndex = this.currentStep + 1;

      if (this.$store.state.wizardConfig.nextButtonText === 'Review') {
        nextStepIndex = this.getWizardSteps().length - 2;
      }

      return this.$store.dispatch('wizardConfig/goToStep', nextStepIndex);
    },

    /**
    * Returns to the previous wizard step
    */
    prevStep(event) {
      this.preventEventDefaultAction(event);
      this.setAfterFormValidationAction(null);

      return this.$store.commit('wizardConfig/setProperties', {
        currentStep: this.currentStep - 1,
        nextButtonText: 'Next',
      });
    },

    /**
    * Validates the current step
    */
    validateStep(event) {
      this.preventEventDefaultAction(event);

      const { activeStepComponent } = this.$refs;

      activeStepComponent.$validator.validateAll().then((result) => {
        if (!result) { return; }

        /**
        * This is here if the step needs to peform an action after
        * vee-validate has validated the step's form
        * A promise must be return as the action may contact a server.
        */
        const handleAfterFormValidationAction = () => (
          this.afterFormValidationAction
            ? this.afterFormValidationAction()
            : new Promise(resolve => resolve(null))
        );

        handleAfterFormValidationAction()
          .then(() => this.nextStep(event))
          .catch(error => console.error(error)); // eslint-disable-line
      }).catch(error => console.error(error)); // eslint-disable-line
    },

    /**
    * This is here to allow the step wizard to handle the next,
    * previous and validation event actions
    */
    preventEventDefaultAction(event) {
      if (event !== undefined) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .purchase-modal-example {
    top: 12%;
    position: absolute;
    width: 25%;
    left: 5%;
    border-radius: 30px;
    border: #161616 solid;
    padding: 1% 2% 1% 3%;
    background-color: white;
  }
</style>
