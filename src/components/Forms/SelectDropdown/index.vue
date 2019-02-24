<!--
SelectDropdown (Universal)

A selector that recieves an array of objects with { id, title } and displays
them as a select dropdown.

Implementation:

<select-dropdown
  label="Input label string"
  v-model="Variable to be updated in parent component"
  id="Element Id String"
  name="Element Name String"
  error="Is There an Error in the Form Containing the Select Dropdown"
  :select-objects="[{ id, title }, { id, title }]"
/>
-->
<template lang="html">
  <div class="input">
    <select
      v-validate="vvRules"
      :data-vv-name="vvName"
      :name="name"
      :readonly="readonly"
      :disabled="disabled"
      :class="{ 'error' : error || errors.has(vvName) }"
      :tabindex="tabindex"
      :id="id"
      :current-value="currentValue"
      v-model="value"
      @change="$emit('change', value)"
    >
      <option :value="null" disabled selected>{{ label }}</option>

      <option v-for="selectObject in selectObjects"
      v-bind:key="selectObject.id"
      :value="selectObject">
        {{selectObject.title}}
      </option>
    </select>

    <form-error
      v-show="errors.has(vvName)"
      :message="errors.first(vvName)"
    />
  </div>
</template>
<script>

import FormError from '../FormError/index.vue';

export default {
  name: 'Select-Dropdown',

  inject: ['$validator'],

  components: {
    FormError,
  },

  model: {
    prop: 'currentValue',
    event: 'change',
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
    * The unique id, required for the select dropdown.
    */
    id: {
      type: String,
      default: '',
    },

    /**
    * The name, required for the select dropdown.
    */
    name: {
      type: String,
      default: '',
    },

    /**
    * The label, shown in the dropdown menu.
    */
    label: {
      type: String,
      default: '',
    },

    /**
    * The the options, available in the dropdown.
    */
    selectObjects: {
      type: Array,
      default: () => [],
    },

    /**
    * The dropdown value selected currently
    */
    currentValue: {
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
    * Does the select dropdown have custom non v-validate error.
    */
    error: {
      type: Boolean,
      default: false,
    },

    /**
     * The text for the label.
     */
    tabindex: {
      type: String,
      default: '0',
    },
  },

  data() {
    return {
      value: this.currentValue,
    };
  },
};
</script>
<style lang="scss" scoped>
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    margin: 0.38em;
    flex: 1;
    margin-right: 44px;
    margin: 0;
    padding-left: 44px;
    font-size: 1em;
    color: inherit;
    font-family: inherit;
    -webkit-appearance: none;
    border-radius: 4px;
    padding: 0.8em 0 0.8em 0.4em;
    border: 1px solid hsl(0,0%,83%);
    width: 100%;

    font-weight: 300;

    &.error {
      border-color: #D43240;
    }
  }

  select.no-value {
    color: #A6A8AB !important;
    font-weight: 300 !important;
    font-size: inherit !important;
    font-family: inherit !important;
  }

  select {
    > option {
      &:not(disabled) {
        color: #414042;
      }
    }
  }

  .input {
    display: block;
    position: relative;
    flex: 1;
  }
</style>
