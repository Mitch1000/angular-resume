<!--
Forms/Input (Universal)

Renders a dumb form input that takes accepts v-model.
-->

<template>

  <div :class="['input', { 'input--is-inline': isInline }]">

    <input
      v-validate="vvRules"
      ref="inputValue"
      :class="['input__field', {'input__field--has-error': errors.has(vvName)}]"
      :disabled="disabled"
      :id="id"
      :data-vv-name="vvName"
      :readonly="readonly"
      :style="styles"
      :tabindex="tabindex"
      :type="type"
      :value="value"
      @input="updateValue"
    />

    <div v-show="isDateInput" class="input__date-icon" :style="styles">
      <i class="fa fa-fw fa-calendar" ></i>
    </div>

    <form-error
      v-show="errors.has(vvName)"
      :message="errors.first(vvName)"
    />
  </div>
</template>

<script>
import FormError from './FormError/index.vue';

export default {
  /* global $ */

  inject: ['$validator'],

  components: {
    FormError,
  },

  props: {
    /**
    * Whether the field is disabled and styled as such.
    */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
    * The unique id, required for the datePicker.
    */
    id: {
      type: String,
      default: '',
    },

    /**
    * Sometimes you want your input field to be inline.
    */
    isInline: {
      type: Boolean,
      default: false,
    },

    /**
    * Initializes datepicker.
    */
    datePicker: {
      type: Object,
      default: () => {},
    },

    /**
    * Whether the field is readonly and styled as such.
    */
    readonly: {
      type: Boolean,
      default: false,
    },

    /**
    * Inline styles that will be added to <input>.
    */
    styles: {
      type: Object,
      default: () => {},
    },

    /**
     * The text for the label.
     */
    tabindex: {
      type: String,
      default: '0',
    },

    /**
     * The input field type. Must be one of the following:
     *  text, email, phone, password, ...?
     */
    type: {
      type: String,
      default: 'text',
    },

    /**
     * The v-validate rules that will be enforced on this input.
     */
    vvRules: {
      type: String,
      default: '',
    },

    /**
    * The unique idenifier of the input, required for v-validate errors.
    */
    vvName: {
      type: String,
      default: '',
    },

    /**
     * The current value passed in from the parent.
     */
    value: {
      default: '',
    },
  },

  data() {
    return {
      isDateInput: false,
      datePickerInstance: null,
    };
  },

  mounted() {
    if (this.id && (Object.keys(this.datePicker).length > 0)) {
      // Sets isDateInput to true which adds a class for the data input styles:
      this.isDateInput = true;

      // Saves the datetimepicker instance to the local state:
      this.datePickerInstance = $(`#${this.id}`).datetimepicker(this.datePicker);

      // Trigger the update on changeDate (bootstrap event):
      return this.datePickerInstance.on('changeDate', e => this.$emit('input', e.target.value));
    }

    return false;
  },

  methods: {
    /**
     * updateValue - Returns the value to the v-model setter via $emit('input').
     */
    updateValue() {
      const newValue = this.$refs.inputValue.value;
      return this.$emit('input', newValue);
    },
  },
};
</script>

<style lang='scss' scoped>
  .input {
    display: block;
    position: relative;
    flex: 1;
  }

  .input--is-inline {
    display: inline-block;
    flex: 1;
  }

  .input__field {
    outline: 0;
    border: 1px solid rgb(200, 200, 200);
    padding: 6px 8px;
    width: 100%;
    box-sizing: border-box;
    font-size: inherit;
    line-height: 22px;

    &:disabled {
      background-color: rgba(140, 140, 140, .2);
      color: rgb(140, 140, 140);
      opacity: .3;
    }

    &:focus {
      border-color: rgb(140, 140, 140);
    }

    &[readonly] {
      background-color: rgba(200, 200, 200, .1);
      opacity: .8;
    }
  }

  .input__field--has-error {
    border-color: #D43240;
  }

  .input__date-icon {
    position: absolute;
    top: 1px;
    right: 1px;
    padding: 6px 12px;
    font-size: inherit;
    font-weight: normal;
    line-height: 22px;
    color: #555555;
    text-align: center;
    background-color: rgb(220, 220, 220);
    border-left: 1px solid rgb(200, 200, 200);
    display: inline-block;
    min-width: 45px;
  }

  .input__date-icon > i {
    align-self: center;
  }
</style>
