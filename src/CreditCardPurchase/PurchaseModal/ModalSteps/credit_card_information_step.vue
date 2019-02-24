<template lang="html">

  <div class="purchase-modal" >
    <div class="purchase-modal-title">
      In forms I have created similiar to this one, this Credit Card information
      would have been connected to the back-end via Stripe.
    </div>

    <form-field-container>
      <div class="purchase-modal-textbox">
        <input
        name="credit card"
        id="credit-card"
        :class="{ 'error': errors.has('credit card') }"
        data-vv-delay="1000"
        v-model.trim="cardNumber"
        type="text"
        placeholder="Card Number"
        autofocused
        v-validate="'required|credit_card'"/>

        <i class="fa fa-credit-card"></i>
        <ul class="errors-list filled" v-if="errors.has('credit card')">
          <li class="error">{{ errors.first('credit card') }}</li>
        </ul>
      </div>
    </form-field-container>

    <form-field-container>
      <div class="purchase-modal-textbox">
        <input style="display: none;" name="the current date" value="04/18"></input>
        <input name="credit card expiry"
        id="card-expiry"
        type="text"
        placeholder="MM / YY"
        data-vv-delay="1000"
        v-model.trim="cardExpiry"
        v-validate="`required|date_format:MM/YY|after:${currentMonth}/${currentYear}`"/>

        <i class="fa fa-calendar"></i>
        <ul class="errors-list filled" v-if="errors.has('credit card expiry')">
          <li class="error">{{ errors.first('credit card expiry') }}</li>
        </ul>
      </div>

      <div class="purchase-modal-textbox" slot="second-input">
        <input
        name="cvc"
        id="card-cvc"
        type="number"
        placeholder="CVC"
        data-vv-delay="1000"
        v-model.trim="cardCvc"
        v-validate="'required|digits:3'"/>

        <i class="fa fa-lock"></i>
        <ul class="errors-list filled" v-if="errors.has('cvc')">
          <li class="error">{{ errors.first('cvc') }}</li>
        </ul>
      </div>
    </form-field-container>

    <form-field-container>
      <div class="purchase-modal-textbox">
        <input
        name="postal code"
        id="postal-code"
        type="text"
        placeholder="Zip / Postal Code"
        data-vv-delay="1000"
        v-model.trim="postalCode"
        v-validate="'required|min:5|max:7'"/>

        <ul class="errors-list filled" v-if="errors.has('postal code')">
          <li class="error">{{ errors.first('postal code') }}</li>
        </ul>

        <i class="fa fa-address-card-o"></i>
      </div>
    </form-field-container>

    <div class="purchase-modal-textbox">
      <ul class="errors-list filled" v-if="stripeError">
        <li class="error">{{ stripeError }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import FormFieldContainer from '../../../components/Forms/FormFieldContainer/index.vue';

export default {
  name: 'Credit-Card-Information-Step',

  components: {
    FormFieldContainer,
  },

  props: {
    setAfterFormValidationAction: Function,
  },

  data() {
    return {
      stripeError: null,
    };
  },

  computed: {
    currentMonth() {
      const month = new Date().getMonth() + 1;
      return month >= 10 ? month : `0${month}`;
    },

    currentYear() {
      return new Date().getFullYear().toString().substr(-2);
    },

    cardNumber: {
      get() {
        return this.$store.state.creditCard.cardNumber;
      },
      set(value) {
        this.$store.commit('creditCard/setProperties', { cardNumber: value });
      },
    },

    cardExpiry: {
      get() {
        return this.$store.state.creditCard.cardExpiry;
      },
      set(value) {
        this.$store.commit('creditCard/setProperties', { cardExpiry: value });
      },
    },

    cardCvc: {
      get() {
        return this.$store.state.creditCard.cardCvc;
      },
      set(value) {
        this.$store.commit('creditCard/setProperties', { cardCvc: value });
      },
    },

    postalCode: {
      get() {
        return this.$store.state.creditCard.postalCode;
      },
      set(value) {
        this.$store.commit('creditCard/setProperties', { postalCode: value });
      },
    },
  },

  created() {
    this.setupStepWizard();
    this.setAfterFormValidationAction(this.generateStripeCreditCardToken);
  },

  methods: {
    /**
    * This function is here to setup the step wizard on initialization
    */
    setupStepWizard() {
      this.$store.commit('wizardConfig/setProperties', {
        popupModalTitle: 'Enter Your Payment Information',
      });

      return this.$store.commit('wizardConfig/setProperties', {
        canCancel: false,
        canNext: true,
        nextButtonText: 'Next',
        nextButtonClass: '',
        canPrev: true,
      });
    },

    /**
    * This is here to validate the user's credit
    * card with stripe and to create a token for that card
    * that will be user later to make a stripe purchase.
    */
    generateStripeCreditCardToken() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('creditCard/generateStripeCreditCardToken').then((result) => {
          resolve(result);
        }).catch((result) => {
          reject(result);
          this.stripeError = (result.error.type || null) === 'card_error'
            ? result.error.message
            : 'An error occured when registering your credit card. Please try again later.';
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import './styles/purchase_modal.scss';
  @import './styles/purchaseModalTitle.scss';
</style>
