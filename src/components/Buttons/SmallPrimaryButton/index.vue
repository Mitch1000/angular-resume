<template lang="html">
  <button
    class="resume-button resume-button-prime next "
    v-bind:class="{ green: this.active, red: this.inactive }"
    v-on:click.stop.prevent="clickAction">
    {{text}}
  </button>
</template>

<script>
export default {
  name: 'SmallPrimaryButton',

  props: {
    clickAction: Function,
    text: String,
    active: Boolean,
    inactive: Boolean,
  },
};
</script>

<style lang="scss">
  @import '../styles/resumeButton.scss';

  .resume-button.resume-button-prime {
    @extend .resume-button;

    border-color: hsl(190,76%,38%);
    background-color: hsl(190,76%,38%);
    color: white;

    min-width: 6em;
    padding: 0.6em;
    border-radius: 1.6em;
  }

  .green {
    border-color: rgba(67,160,71 ,1) !important;
    background-color: rgba(67,160,71 ,1) !important;
  }

  .red {
    border-color: rgba(229,57,53 ,1) !important;
    background-color: rgba(229,57,53 ,1) !important;
  }
</style>
