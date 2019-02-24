<template lang="html">

  <confirmation-step :title="title" :has-error="hasError">
    <p class="center-text" v-if="hasError">
      {{serverErrorResponse}}
    </p>
    <div v-else>
      <p class="center-text end-text">Thank You For Testing My Form.
        I hope you found that this form was easy to use.
        For more examples of my work browser my <a class="github-anchor" href="http://github.com/mitch1000">GitHub</a> page.
      </p>
    </div>
  </confirmation-step>
</template>

<script>
import { mapState } from 'vuex';
import ConfirmationStep from './confirmation_step.vue';
import PrimaryLink from '../../../components/PrimaryLink/index.vue';

export default {
  name: 'Order-Confirmation-Step',

  components: {
    ConfirmationStep,
    PrimaryLink,
  },

  computed: Object.assign({
    /**
    * Has the purchased all the items?
    *
    * @returns {Boolean} Have all the available sections been purchased
    */
    isAllSectionsPurchased() {
      return this.$store.state.purchaseOrder.isAllItemsPurchased;
    },

    /**
    * The title shown at the top of the order confirmation step
    *
    * @returns {String}
    */
    title() {
      return this.hasError
        ? 'An Error Occured When Attempting Your Purchase.'
        : 'Thank You for Participating';
    },

    /**
    * The parsed error returned by the server on server error.
    *
    * @returns {String}
    */
    serverErrorResponse() {
      /**
      * The status message coming from the server
      * ie: 500 - Internal server error
      *
      * @returns {Object} status, statusText
      */
      const getServerStatus = () => {
        const responseData = (this.error.response || this.error);
        const { statusText } = responseData;
        let { status } = responseData;
        status = status || (this.error.data || {});

        return {
          status,
          statusText,
        };
      };

      const handledServerError = (((this.error.response || {}).data || {}).errors || [])[0];
      if (handledServerError) { return handledServerError; }

      const unhandledServerError = `The server responded with ${getServerStatus().statusText}. Error Code: ${getServerStatus().status}`;
      return unhandledServerError;
    },
  }, mapState({
    hasError: state => state.purchaseOrder.hasError,
    error: state => state.purchaseOrder.error,
  })),

  beforeMount() {
    this.setupStepWizard();
  },

  methods: {
    /**
    * This function is here to setup the step wizard on initialization
    */
    setupStepWizard() {
      const popupModalTitle = this.hasError
        ? 'An Error Occured When Attempting Your Purchase'
        : 'Thank You for Participating';

      this.$store.commit('wizardConfig/setProperties', { popupModalTitle });

      return this.$store.commit('wizardConfig/setProperties', {
        canCancel: false,
        canNext: true,
        nextButtonText: 'Start Over',
        nextButtonClass: 'large',
        canPrev: false,
      });
    },

    resetPurchaseWizard() {
    },
  },
};
</script>
<style lang="scss" scoped>
  @import './styles/purchase_modal.scss';
  .end-text {
    padding-top: 1.5em;
  }

  .github-anchor {
    border: none;
  }
</style>
