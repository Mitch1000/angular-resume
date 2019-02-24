<template lang="html">
  <button
    @click.stop.prevent="clickAction"
    :class="['resume-button','resume-button-prime','next', buttonClass]"
  >
    {{text}}
  </button>
</template>

<script>
export default {
  name: 'PrimaryButton',

  props: {
    buttonClass: {
      type: String,
      default: '',
    },
    clickAction: Function,
    text: String,
  },
};
</script>

<style lang="scss">
  @import '../styles/resumeButton.scss';
</style>
