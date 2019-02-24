<!--
AutocompleteSelectField (Universal)

A selector that recieves an array of objects { id, value } and displays
them as a dropdown. There are three callback hooks that allow the parent
component to manage all interaction with the list.

Implementation:

<select-field
  label="Input label string"
  :listItems="[{ id, value }, { id, value }]"
  :currentId="id"
  :currentValue="value"
  @focus="actionTriggeredOnFocus"
  @keyup="actionTriggeredOnKeyup"
  @select="actionTriggeredOnSelect"
/>
-->

<template>
  <div class="select-field">
    <label for="select-field__input" class="select-field__label">
      {{ label }}
    </label>
    <input
      v-model="localValue"
      type="text"
      name="select-field__input"
      class="select-field__input"
      placeholder="..."
      @keyup="handleKeyup"
      @focus="handleFocus"
    />

    <i
      v-if="localId"
      class="select-field__selected mdi-action-check-circle"
    />

    <ul v-if="localItems.length > 0" class="select-field__list">
      <li
        v-for="item in localItems"
        :class="[
          'select-field__item',
          { 'select-field__item--selected': localId === item.id },
        ]"
        :key="item.id"
        :data-id="item.id"
        :data-value="item.name"
        @click="handleSelect"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  /**
   * The props required for this component to work.
   *
   * @prop {String} label         The text for the label
   * @prop {Array}  listItems     An array of objects, each object requires { id, value }
   * @prop {Number} currentId     The id of the currently selected item, the purpose of this
   *                              variable is to toggle the input checkmark
   * @prop {String} currentValue  The value that is visible in the input field
   */
  props: {
    label: String,
    listItems: Array,
    currentId: Number,
    currentValue: String,
  },

  /**
   * Local data for storing a copy of the props for local manipulation.
   *
   * @return {Array}  localItems  A pure copy of listItems
   * @return {Number} localId     A pure copy of currentId
   * @return {String} localValue  A pure copy of currentValue
   */
  data() {
    return {
      localItems: [],
      localId: null,
      localValue: '',
    };
  },


  /**
   * These watchers listen for changes to props and the local data accordingly.
   */
  watch: {
    /**
     * listItems - Listens to the listItems prop for changes and assigns it to localItems.
     */
    listItems() {
      this.localItems = this.listItems;
    },

    /**
     * currentId - Listens to the currentId prop for changes and assigns it to localId.
     */
    currentId() {
      this.localId = this.currentId;
    },

    /**
     * currentValue - Listens to the currentValue prop for changes and assigns it to localValue.
     */
    currentValue() {
      this.localValue = this.currentValue;
    },
  },

  methods: {
    /**
     * handleFocus - When the input is in focus $emit the `focus` event. This is used to open
     * and close the select by generating and passing a list of items to this component.
     *
     * @param   {FocusEvent} e
     * @return  emit the `focus` event with `e` as the payload
     */
    handleFocus(e) {
      return this.$emit('focus', e);
    },

    /**
     * handleKeyup - When the user types into the input field $emit the `keyup` event. This is
     * used to filter the list of items in the parent component, updates the list and passes
     * the new list to this component.
     *
     * @param   {KeyboardEvent} e
     * @return  $emit the `focus` event with `e` as the payload
     */
    handleKeyup(e) {
      return this.$emit('keyup', e);
    },

    /**
     * handleSelect - When the user clicks on an item in the list $emit the `select` event
     * and passes the resulting { id, value } object back to the parent component.
     *
     * @param   {MouseEvent} e
     * @return  $emit the `focus` event with the selected `{ id, value }` object as the payload
     */
    handleSelect(e) {
      const { id, value } = e.currentTarget.dataset;
      return this.$emit('select', { id: parseInt(id, 10), value });
    },
  },
};
</script>

<style lang="scss" scoped>
  .select-field {
    position: relative;
    margin-bottom: 30px;
  }

  .select-field__label {
    display: block;
    margin: 0;
    line-height: 20px;
    font-size: 13px;
    font-weight: 600;
  }

  .select-field__input {
    display: block;
    outline: 0;
    border: 1px solid grey;
    padding: 4px 10px;
    width: 100%;
    line-height: 24px;
  }

  .select-field__selected {
    position: absolute;
    top: 20px;
    right: 10px;
    line-height: 32px;
    color: pink;
  }

  .select-field__list {
    position: absolute;
    top: 51px;
    z-index: 10;
    margin: 0;
    box-shadow: 0 2px 1px 1px rgba(60, 60, 60, .3);
    border: 1px solid grey;
    background-color: white;
    padding: 0;
    width: 100%;
    max-height: 160px;
    overflow: auto;
    list-style: none;
  }

  .select-field__item {
    display: block;
    margin: 0;
    padding: 0 10px;
    width: 100%;
    line-height: 30px;
    cursor: pointer;

    &:hover {
      background-color: whitesmoke;
    }
  }

  .select-field__item--selected {
    background-color: rgba(pink, .6);

    &:hover {
      background-color: rgba(pink, .8);
    }
  }
</style>
