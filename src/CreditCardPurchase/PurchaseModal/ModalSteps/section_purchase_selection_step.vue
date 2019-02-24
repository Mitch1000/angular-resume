<template lang="html">
  <div class="purchase-modal">
    <div class="purchase-modal-title">
      This is a demo purchase form I created.
    </div>

    <form-field-container>

      <select
      name="page selection"
      :class="{'error' :errors.has('page selection'), 'no-value' : currentSelection == null}"
      id="number-of-pages-selector"
      v-model.trim="currentSelection"
      v-validate="'required'">
        <option :value="null" disabled selected>Choose Your Option</option>

        <option v-for="pageSelection in pageSelections"
        v-bind:key="pageSelection.value"
        :value="pageSelection.value">
          {{pageSelection.name}} ({{formatCurrency(pageSelection.price)}})
        </option>
      </select>
      <ul class="errors-list filled" v-if="errors.has('page selection')">
        <li class="error">{{ errors.first('page selection') }}</li>
      </ul>
    </form-field-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import FormFieldContainer from '../../../components/Forms/FormFieldContainer/index.vue';

export default {
  name: 'PurchaseSelectionStep',

  components: {
    FormFieldContainer,
  },

  computed: Object.assign({
    // This dictates the cost of the section.
    currentSelection: {
      get() {
        return this.$store.state.purchaseOrder.currentSelection;
      },
      set(value) {
        this.$store.commit('purchaseOrder/setProperties', { currentSelection: value });
      },
    },
    selectedOption() {
      return this.$store.state.purchaseOrder.purchaseOptions
        .find(option => this.$store.state.purchaseOrder.currentSelection === option.value);
    },
  }, mapState({
    pageSelections: state => state.purchaseOrder.purchaseOptions,
  })),

  created() {
    this.setupStepWizard();
  },

  methods: {
    formatCurrency(priceInCents) {
      return `$${(priceInCents / 100).toFixed(2)} CAD`;
    },
    /**
    * This function is here to setup the step wizard on initialization
    */
    setupStepWizard() {
      this.$store.commit('wizardConfig/setProperties', {
        popupModalTitle: 'This is a Demo of a Modal for Making a Credit Card Purchase',
      });

      return this.$store.commit('wizardConfig/setProperties', {
        canCancel: false,
        canNext: true,
        nextButtonText: 'Make Your (Test) Purchase',
        nextButtonClass: 'large',
        canPrev: false,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  @import './styles/purchase_modal.scss';
  @import './styles/purchaseModalTitle.scss';

  .price-listings {
    margin-top: 0;
    padding: 0;
    list-style-type: none;

    li {
      color: hsl(0,0%,50%);
    }
  }
</style>
