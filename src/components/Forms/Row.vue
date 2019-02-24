<!--
Forms/Row (Universal)

Renders a dumb form row that takes a value and returns a new one onKeyup.
-->

<template>

    <div class="form-row" :style="styles">
      <label v-if="label" class="form-row__label">
        {{ label }}
      </label>

      <div class="form-row__wrap">
        <slot>
          <input
          class="form-row__input"
          @keyup="toggleUpdate"
          :tabindex="tabindex"
          :type="type"
          :value="value"
          :disabled="disabled"
          :readonly="readonly"
          />
        </slot>
      </div>
    </div>

</template>

<script>

export default {
  props: {
    /**
     * The inline styles to be added to div.form-row.
     */
    styles: {
      type: String,
      default: '',
    },

    /**
     * The input field type. I.e. text, email, phone, etc.
     */
    type: {
      type: String,
      default: 'text',
    },

    /**
     * The text for the label.
     */
    label: {
      type: String,
      default: '',
    },

    /**
     * The text for the label.
     */
    tabindex: {
      type: String,
      default: '0',
    },

    /**
     * The current value passed in from the parent.
     */
    value: {
      type: String,
      default: '',
    },

    /**
     * Whether the field is disabled and styled as such.
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Whether the field is readonly and styled as such.
     */
    readonly: {
      type: Boolean,
      default: false,
    },

    /**
     * The method to trigger when a keyup is triggered on the input.
     */
    onUpdate: {
      type: Function,
      default: () => false,
    },
  },

  data() {
    return {
      localValue: '',
    };
  },

  methods: {
    // TODO: This input functionality needs to be modified to work the same as/with
    // the Input component. Needs to work with v-model.

    /**
     * toggleUpdate - This method simply catches the value of the input and
     * passes it back to the parent component.
     *
     * @return  Executes the onUpdate prop method with the value of the field.
     */
    toggleUpdate(e) {
      const { value } = e.currentTarget;
      return this.onUpdate(value);
    },
  },
};
</script>

<style lang='scss' scoped>
.form-row {
  margin-bottom: 10px;
}

.form-row__wrap {
  display: flex;
}

.form-row__label {
  display: block;
  margin-bottom: 4px;
  font-weight: 100;
  color: #757575;
  text-align: left;
}

.form-row__input {
  flex: 1;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px 10px;
  font-size: inherit;
  line-height: 12px;
  box-sizing: border-box;
  border: 1px solid rgb(200, 200, 200);

  &:disabled {
    background-color: rgba(140, 140, 140, .2);
    color: rgb(140, 140, 140);
    opacity: .3;
  }

  &[readonly] {
    background-color: rgba(200, 200, 200, .1);
    opacity: .8;
  }
}
</style>
