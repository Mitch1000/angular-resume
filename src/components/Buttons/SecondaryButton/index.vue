<template lang="html">
  <button
    @click.stop.prevent="clickAction"
    :class="['resume-button', 'cancel', buttonClass]"
  >
    {{text}}
  </button>
</template>

<script>
export default {
  name: 'SecondaryButton',

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
