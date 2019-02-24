<!--
  StepWizard/StepContainer

  The wrapper div for a StepWizard step.
-->

<template>

  <div class="step">
    <slot />
  </div>

</template>

<style lang="scss" scoped>
  .step {
    max-height: 100%;
    overflow: auto;
  }
</style>
