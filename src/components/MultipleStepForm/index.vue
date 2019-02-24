<template lang="html">
  <div class="step-wizard-container modal-body">
    <slot />

    <slot name="footer">
      <wizard-footer/>
    </slot>
  </div>
</template>

<script>
import WizardFooter from './WizardFooter.vue';

export default {
  name: 'StepWizard',

  components: {
    WizardFooter,
  },
};
</script>

<style lang="scss" scoped>
  .step-wizard-container {
    height: calc(100% - 120px);
  }
</style>
