<template>
  <div class="radio-button">
    <input
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :checked="isChecked"
      @change="triggerChange"
    >

    <label :for="id">
      <slot name="label">{{ label }}</slot>
    </label>

  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    id: {
      required: true,
      type: String,
    },

    name: {
      required: true,
      type: String,
    },

    label: {
      default: 'Please provide a label',
      type: String,
    },

    value: {
      required: true,
    },

    modelValue: {},
  },

  computed: {
    /**
     * isChecked - Returns true if modelValue === value
     *
     * @return {Boolean}
     */
    isChecked() {
      return this.modelValue === this.value;
    },
  },

  methods: {
    /**
     * triggerChange - Updates the model of the radio button on change
     *
     * @return {Function}  The change event
     */
    triggerChange() {
      return this.$emit('change', this.value);
    },
  },
};
</script>

<style lang="scss" scoped>

.radio-button {
  display: inline-flex;
  width: 100%;
  margin: 0.62em 0;

  label {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.24em;

    span {
      margin: 0.15em 0;
    }
  }
}

[type="radio"] {
  margin: 0.38em 0.62em;
  display: none;

  & + label {
    position: relative;
    padding-left: 32px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 22px;
      height: 22px;
      border: 1px solid #dadada;
      border-radius: 100%;
    }

    &:after {
      content: '';
      width: 16px;
      height: 16px;
      background: #009AB9;
      position: absolute;
      top: 4px;
      left: 4px;
      border-radius: 100%;
      transition: all 0.24s ease;
    }
  }

  &:checked {
    & + label:after {
      opacity: 1;
      transform: scale(1);
    }

    &:active + label:after {
      opacity: 1;
      transform: scale(0.83);
    }
  }

  &:not(:checked) {
    & + label:after {
      opacity: 0;
      transform: scale(0);
    }

    &:active + label:after {
      opacity: 1;
      transform: scale(0.38);
    }
  }
}

</style>
