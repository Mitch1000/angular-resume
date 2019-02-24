<!--
Shared: ErrorModal

Displays a PopupModal with a description and error code.
-->

<template lang="html">

  <popup-modal
    title="Error"
    class="error-modal"
    :showLoader="false"
    :toggleOnClose="toggleOnClose"
  >
    <div class="error-modal__icon">
      <i class="mdi-alert-error" :style="colorStyle"/>
    </div>

    <div class="error-modal__description">
      {{ description }}
    </div>

    <details class="error-modal__details">
      <summary class="error-modal__summary">
        More Info
      </summary>

      <p class="error-modal__code">
        {{ errorCode }}
      </p>
    </details>
  </popup-modal>

</template>

<script>
const PopupModal = require('../index.vue');

export default {
  props: {
    // Friendly description of the error, e.g. "Failed to create book":
    description: String,

    // Technical error code, e.g. "Internal Server Error (500)":
    errorCode: String,

    // Optional: A color string for the error icon:
    color: {
      type: String,
      default: '',
    },

    // Optional: A function that will be triggered when the ErrorModal is closed:
    toggleOnClose: {
      type: Function,
      default: () => false,
    },
  },

  components: {
    PopupModal,
  },

  computed: {
    /**
     * colorStyle - An style object built from the color prop, if there is one.
     *
     * @return {Object}  { color: this.color } || {}
     */
    colorStyle() {
      if (!this.color) { return {}; }
      return { color: this.color };
    },
  },
};
</script>

<style lang="scss" scoped>
  .error-modal {
  }

  .error-modal__icon {
    margin: 0 0 20px;
    text-align: center;
    font-size: 60px;
    line-height: 80px;
  }

  .error-modal__description {
    text-align: center;
    margin: 0 0 20px;
  }

  .error-modal__details {
    padding: 10px 0 0;
    border-top: 1px solid whitesmoke;
    font-size: 13px;
    cursor: pointer;
  }

  .error-modal__summary {
    outline: 0;
  }

  .error-modal__code {
    padding: 10px 0;
  }
</style>
