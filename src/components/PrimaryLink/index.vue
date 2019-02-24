<!--
PrimaryLink (Universal)

A link that accepts an javascript click action or an href

Implementation:

<primary-link
:text="'The text shown in the link'"
:action="The function run when the link is clicked" />
-->
<template>
  <a
    @click="performClick"
    >
    <slot/>
  </a>
</template>
<script>
export default {
  name: 'Link',

  props: {
    href: String,
    newTab: {
      type: Boolean,
      default: false,
    },
    action: {
      type: Function,
      default: () => false,
    },
    text: String,
  },

  methods: {
    performClick() {
      this.action();
      if (!this.href) return;

      if (this.newTab) {
        window.open(this.href, '_blank');
      } else {
        window.location.href = this.href;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  a {
    color: #197F94;
    text-decoration: none;
    cursor: pointer;
  }
</style>
