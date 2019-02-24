<!--
FormFieldContainer (Universal)

A container for holding form inputs

Implementation:

<form-field-container>
  <input/>
  <input slot="second-input/>
</form-field-container>
-->
<template>
  <div class="flex-container">
    <div class="form-container"> <slot/> </div>
    <div class="form-container" v-if="$slots['second-input']" > <slot name="second-input"/> </div>
    <div class="form-container" v-if="$slots['third-input']" > <slot name="third-input"/> </div>
    <div class="form-container" v-if="$slots['fourth-input']" > <slot name="fourth-input"/> </div>
    <div class="form-container" v-if="$slots['fifth-input']" > <slot name="fifth-input"/> </div>
  </div>
</template>

<script>
export default {
  name: 'FormFieldContainer',
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  margin-bottom: 15px;
  margin-top: 15px;
}

.form-container {
  position: relative;
  margin: 0.38em;
  flex: 1;
}
</style>
