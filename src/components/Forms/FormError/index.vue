<!--
Form Error (Universal)

Red text that appears below a for input when the input has an error

Implementation:

<form-error
:message="The message that will
show when the form input this component is below has an invalid input"
/>

-->
<template lang="html">
  <ul class="errors-list filled">
    <li class="error">{{ message }}</li>
  </ul>
</template>

<script>
export default {
  name: 'FormError',

  props: {
    message: String,
  },
};
</script>
<style lang="scss" scoped>
.errors-list {
  margin: 0;

  &.filled {
    list-style-type: none;
    margin: 0.38em 0 0.62em 0;
    padding: 0;
    color: #D43240;
  }
}

</style>
