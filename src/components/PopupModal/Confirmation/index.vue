<template lang="html">
  <popup-modal
    :title="title"
    :show-loader="isLoading"
    :accentColor="accentColor"
    :toggle-on-close="confirm"
  >
    <div class="confirmation-modal__content">
      <slot />
      <p>
        <a
          class="confirmation-modal__button"
          @click="confirm(false)"
        >
          {{ cancelButton }}
        </a>
        <a
          class="confirmation-modal__button"
          @click="confirm(true)"
          :style="{ backgroundColor: accentColor }"
        >
          {{ confirmButton }}
        </a>
      </p>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from '../index.vue';

export default {
  components: { PopupModal },

  data() {
    return {
      confirmed: false,
    };
  },

  props: {
    confirmAction: Function,
    cancelAction: Function,

    // Set defaults:
    title: {
      type: String,
      default: 'Are you sure?',
    },

    cancelButton: {
      type: String,
      default: 'Cancel',
    },

    confirmButton: {
      type: String,
      default: 'Yes, proceed!',
    },

    accentColor: {
      type: String,
      default: 'grey',
    },

    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    confirm(confirmation = false) {
      // Set confirmation state:
      this.confirmed = confirmation;

      // If false, trigger cancelAction:
      if (!confirmation) {
        return this.cancelAction();
      }

      // If confirmed, trigger confirmAction:
      return this.confirmAction();
    },
  },
};
</script>

<style lang="scss" scoped>
  .confirmation-modal__content {
    text-align: center;
    padding: 0 0 10px;
  }

  .confirmation-modal__button {
    display: inline-block;
    margin: 30px 10px 0;
    outline: 0;
    border: 0;
    border-radius: 16px;
    background-color: grey;
    padding: 0 20px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: white;
    cursor: pointer;
  }
</style>
