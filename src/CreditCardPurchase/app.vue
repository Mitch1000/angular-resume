<template>
  <div class="fundraising-container">
     <purchase-modal
      v-if="true"
    />
  </div>
</template>

<script>
import PurchaseModal from './PurchaseModal/app.vue';

export default {
  name: 'CreditCardPurchase',

  components: {
    PurchaseModal,
  },

};
</script>

<style lang="scss" scoped>
@media (max-width: 1025px) {
  .fundraising-container {
    display: none;
  }
}
</style>
