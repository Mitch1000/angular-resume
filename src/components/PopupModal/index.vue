<template lang="html">
  <div
    :class="[
      {'base-modal--show': isActive},
      {'base-modal--preventClick': showLoader},
      'base-modal-component'
    ]"
  >
    <div class="base-modal" :style="modalStyles">
      <div v-if="showLoader" class="base-modal__load-mask">
        <circle-loader :color="accentColor" />
      </div>

      <header class="base-modal__header">
        <h1 class="base-modal__title">{{ title }}</h1>

        <span class="base-modal__close" @click="close">
          <i class="mdi-navigation-close" />
        </span>
      </header>

      <div class="base-modal__content">
        <slot />
      </div>
    </div>

    <div class="base-modal-component__overlay" @click="close" />
  </div>

</template>

<script>
import CircleLoader from '../../components/CircleLoader/index.vue';

export default {
  components: {
    CircleLoader,
  },

  props: {
    title: String,
    error: String,
    toggleOnClose: {
      type: Function,
      default: () => false,
    },
    showLoader: Boolean,
    accentColor: String,
    modalStyles: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isActive: true,
    };
  },

  methods: {
    close() {
      this.isActive = false;
      return this.toggleOnClose();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
