<template lang="html">
  <div class="step-wizard-footer">
    <div class="step-wizard-footer__actions limited-width">
      <slot>

        <div
          v-if="config.cancel.enabled || config.previous.enabled"
          class="step-wizard-footer__actions--left"
        >
          <slot name="cancel">
            <secondary-button
              v-if="config.cancel.enabled"
              :click-action="config.cancel.action"
              :text="config.cancel.text"
              :button-class="config.cancel.buttonClass"
            />
          </slot>

          <slot name="previous">
            <secondary-button
              v-if="config.previous.enabled"
              :click-action="config.previous.action"
              :text="config.previous.text"
              :button-class="config.previous.buttonClass"
            />
          </slot>
        </div>

        <slot name="next">
          <primary-button
            v-if="config.next.enabled"
            :click-action="config.next.action"
            :text="config.next.text"
            :button-class="config.next.buttonClass"
          />
        </slot>

      </slot>
    </div>
  </div>
</template>

<script>
import PrimaryButton from '../Buttons/PrimaryButton/index.vue';
import SecondaryButton from '../Buttons/SecondaryButton/index.vue';

export default {
  name: 'WizardFooter',

  components: {
    PrimaryButton,
    SecondaryButton,
  },

  computed: {
    /**
     * config - Returns the current wizardConfig via the
     * wizardConfig/getCurrentConfig getter
     *
     * @return {Object}
     */
    config() {
      return this.$store.getters['wizardConfig/getCurrentConfig']();
    },
  },
};
</script>

<style lang="scss" scoped>
  .step-wizard-footer {
    border-top: 1px solid #e5e5e5;
    padding: 15px;
    text-align: right;
  }

  .step-wizard-footer__actions {
    display: flex;
    justify-content: flex-end;
    text-align: left;
  }

  .step-wizard-footer__actions--left {
    flex: 1;
  }
</style>
