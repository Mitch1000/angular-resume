<template lang="html">
  <div class="section-header">
    <div class="section-nav">

      <ul class="nav nav-tabs section-nav__items">
        <li v-for="step in steps" :key="step.id" :class="{ active: currentStep == step.id }" @click="goToStep(step.id)">
          <i class="material-icons">{{ step.icon }}</i>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>

export default {
  name: 'StepIcons',

  props: {
    steps: Array,
    allowNavigation: {
      // Allow navigation between steps on click
      type: Boolean,
      default: false,
    },
  },

  computed: {
    /**
     * Returns the current state of wizardConfig for the StepWizard.
     *
     * @return {Number}
     */
    currentStep() {
      return this.$store.state.wizardConfig.currentStep;
    },
  },

  methods: {
    /**
    * Navigates to a specific step in the wizard by id
    *
    * @param {Number} stepId ID of the step to navigate to
    * @return {Function} The wizard's goToStep function, or false
    */
    goToStep(stepId) {
      if (this.allowNavigation) {
        return this.$store.dispatch('wizardConfig/goToStep', stepId);
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.section-header {
  margin-top: 0;
}

.nav-tabs li {
  border: 0;
  padding: 15px 10px;
  min-width: 80px;
  text-align: center;
  color: #8c8c8c;
  cursor: default;
  -webkit-user-select: none;
  user-select: none;

  &.active {
    color: #4f708e;
  }
}
</style>
