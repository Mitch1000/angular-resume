<template lang="html">
  <div class="purchase-modal">
    <div class="purchase-modal--content__center" style="margin-bottom: 0.62em; padding-top: 0">
      <i v-if="hasError" class="mdi mdi-alert-error icon--large purchase-modal__error"></i>

      <slot/>

    </div>
  </div>

</div>

</template>

<script>
export default {
  name: 'Order-Confirmation-Step',

  props: {
    title: String,
    hasError: Boolean,
  },
};
</script>
<style lang="scss" scoped>
  @import './styles/purchase_modal.scss';
  .confirmation--title {
    font-weight: 400;
    font-size: 1.38em;
    text-align: center;
    margin-top: 0;
  }
</style>
