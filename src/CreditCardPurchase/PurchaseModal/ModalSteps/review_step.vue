<template lang="html">
<div class="purchase-modal">
  <div class="purchase-modal-title">
    Along with creating the payment form front-end I also have experience creating a secure Stripe payment
    back-end using Ruby on Rails.
  </div>

  <div class="purchase-review--section">
    <div class="purchase-modal--title-group">
      <span class="purchase-modal--title-group--left">Your Cart:</span>
      <button class="resume-button align-right" @click="reviewStep(0)">
        <i class="mdi-navigation-chevron-left"></i>
        Edit Item
      </button>
    </div>

    <div class="purchase-modal--title-group">
      <span class="purchase-modal--title-group--left">
        <strong>{{selectedOption.name}}</strong>
      </span>
      <span style="font-weight: 600">
        <span style="font-weight: 300"></span>
        <b>{{ formatCurrency(price) }}</b>
      </span>
    </div>
  </div>

  <div class="purchase-review--section">
    <div class="purchase-modal--title-group">
      <span class="purchase-modal--title-group--left">Payment Method:</span>
      <button @click="reviewStep(1)" class="resume-button">
        <i class="mdi-navigation-chevron-left"></i>
        Edit Payment Method
      </button>
    </div>

    <p>
      <strong>{{cardBrand}}</strong>
      <strong> (ending in {{lastFourDigits}})</strong>
    </p>
  </div>

  <div class="purchase-review--section">
    <div class="purchase-modal--title-group">
      <div class="purchase-modal--title-group--right increase-line-height">
        <span>Subtotal</span><br/>
        <span><strong>Total</strong></span>
      </div>
      <div class="align-right increase-line-height">
        <span style="font-weight:300">{{ formatCurrency(price) }}</span><br/>
        <span><strong>{{ formatCurrency(price) }}</strong></span><br/>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Review-Step',

  props: {
    setAfterFormValidationAction: Function,
  },

  data() {
    return {
      currency: 'CAD',
      cardImage: this.getCardImage(),
      lastFourDigits: this.$store.getters['creditCard/lastFourDigits'](),
      price: this.$store.getters['purchaseOrder/price'](),
    };
  },

  computed: Object.assign(mapState({
    firstName: state => state.address.firstName,
    lastName: state => state.address.lastName,
    zip: state => state.address.zip,
    line1: state => state.address.line1,
    line2: state => state.address.line2,
    city: state => state.address.city,
    country: state => state.address.country,
  }), {
    cardBrand() {
      return this.$store.getters['creditCard/cardBrand']();
    },

    selectedOption() {
      return this.$store.state.purchaseOrder.purchaseOptions
        .find(option => this.$store.state.purchaseOrder.currentSelection === option.value);
    },
  }),

  created() {
    this.setupStepWizard();
    this.setAfterFormValidationAction(this.attemptPurchase);
  },

  methods: {
    /**
    * This function is here match an icon to a credit card brand
    */
    getCardImage() {
      const cardImages = {
        americanexpress: 'amex.svg',
        dinersclub: 'diner.svg',
        jcb: 'jcb.svg',
        discover: 'discover.svg',
        mastercard: 'mastercard.svg',
        visa: 'visa.svg',
      };

      const cardBrand = this.$store.getters['creditCard/cardBrand']();
      return cardImages[cardBrand];
    },

    /**
    * This is here to sets the next button text to review and take the user to the selected step
    * This function also stops the step wizard from attempting to make a
    * purchase during the next step action
    */
    reviewStep(stepNumber) {
      // only validate the form on the next button action
      this.setAfterFormValidationAction(null);
      this.$store.commit('wizardConfig/setProperties', { currentStep: stepNumber, nextButtonText: 'Review' });
    },

    /**
    * This function is here to setup the step wizard on initialization
    */
    setupStepWizard() {
      this.$store.commit('purchaseOrder/setProperties', {
        popupModalTitle: 'Review Your Information',
      });

      return this.$store.commit('wizardConfig/setProperties', {
        canCancel: false,
        canNext: true,
        canPrev: true,
        nextButtonText: 'Purchase',
      });
    },

    /**
    * This function is here to post the Stripe card token to the
    * server and attempt to charge customer for their purchase
    *
    * @returns {Promise} A promise resoloving the server response
    */
    attemptPurchase() {
      /**
      * This is here to setup the WizardConfig for the order confirmation step.
      */
      const setupWizardConfigForFinalStep = () => {
        const initialWizardConfig = this.$store.getters['wizardConfig/getCurrentConfig']();
        /**
        * This function is here to reset the step wizard to it's initial state for the app
        * if the attempt to purchase an item has failed and the user wishes to attempt
        * the purchase again.
        */
        const resetWizardConfig = () => {
          this.$store.dispatch('wizardConfig/setDefaultConfig');
          this.$store.commit('wizardConfig/setProperties', {
            validateStep: initialWizardConfig.next.action,
            prevStep: initialWizardConfig.previous.action,
            closeAction: initialWizardConfig.cancel.action,
          });

          this.setAfterFormValidationAction(null);
        };

        this.$store.commit('wizardConfig/setProperties', {
          canNext: true,
          nextButtonText: 'Try Again',
          nextButtonClass: '',
          validateStep: resetWizardConfig,

          canCancel: true,
          cancelButtonText: 'Close',

          canPrev: false,
        });
      };

      /**
      * This function is here to get a set of params that need to be posted to the server
      * in order to create a successful item purchase.
      *
      * @returns {Object} An object containing the params needed to post to the server.
      */
      const getPurchaseOrderParams = (sectionForPurchaseId) => {
        // params to be sent to the server via the attemptAPurchase action
        const { numberOfPagesForPurchase } = this.$store.state.purchaseOrder;
        // the section the user is attempting to purchase
        const { stripeTokenData } = this.$store.state.creditCard;
        const address = this.$store.getters['address/getFormatedAddressForServer']();
        return {
          stripeToken: stripeTokenData.id,
          numberOfPagesForPurchase,
          sectionForPurchaseId,
          address,
        };
      };

      // returns a promise to allow the step wizard validateStep to handle the step properly
      return new Promise((resolve, reject) => {
        const sectionForPurchaseId = this.$store.state.purchaseOrder.sectionForPurchaseIds[0];
        this.$store.dispatch('purchaseOrder/attemptToMakePurchase', getPurchaseOrderParams(sectionForPurchaseId))
          .then((response) => {
            setupWizardConfigForFinalStep();
            this.$store.commit('purchaseOrder/setProperties', { hasError: false });

            resolve(response);
          }).catch((response) => {
            setupWizardConfigForFinalStep();
            this.$store.commit('purchaseOrder/setProperties', { hasError: true, error: response });

            // even though the purchase failed we still want to go the the next step
            this.$store.dispatch('wizardConfig/goToNextStep');
            reject(response);
          });
      });
    },

    formatCurrency(priceInCents) {
      return `$${(priceInCents / 100).toFixed(2)} ${this.currency}`;
    },
  },
};
</script>
<style lang="scss" scoped>
  @import './styles/purchase_modal.scss';
  @import './styles/purchaseModalTitle.scss';
  @import '../../../components/Buttons/styles/resumeButton.scss';
</style>
