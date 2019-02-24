<!--
DropdownBox

A dropdown box used to display lists used by the Global Navigator
-->
<template>
  <div class="box-drop" :class="{ 'box-drop-display-right': displayRight }">
    <div
      class="box-drop-overlay"
      @click="close"
    />
    <ul class="box-drop__list" v-on:scroll="onScroll" ref="dropdownList">
      <slot/>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DropdownBox',

  props: {
    displayRight: {
      type: Boolean,
      default: false,
    },

    onScrollToBottom: {
      type: Function,
      default: () => false,
    },

    close: {
      type: Function,
      default: () => false,
    },
  },

  methods: {
    /**
    * onScroll - Action take when the user scrolls through the displayed list
    *
    * @return {Object} onScrollToBottom
    */
    onScroll() {
      if (this.onScrollToBottom === (() => false)) { return; }

      const listEl = this.$refs.dropdownList;

      const scrolledToBottom = listEl.scrollTop >= (listEl.scrollHeight - listEl.offsetHeight);
      if (!scrolledToBottom) { return; }

      this.onScrollToBottom();
    },
  },
};
</script>
<style lang="scss" scoped>
  // Box drop
  // -----------------------------------

  .box-drop {
    position: absolute;
    right: 25px;
    top: 130%;
    min-width: 160px;
    white-space: nowrap;
    background-color: rgb(255,255,255);
    border-radius: 5px;
    box-shadow: 0px 2px 3px rgba(0,0,0,.2);
    display: block;
    z-index: 2000;
  }

  .box-drop:before {
    content: '';
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid white;
    position: absolute;
    top: -8px;
    right: 10px;
  }

  .box-drop__list {
    padding: 0px;
    list-style: none;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 90vh;
    min-height: 12vh;
  }

  .box-drop__list__item a {
    padding: 15px 20px 0 20px;
    font-weight: 300;
    font-size: .875rem;
    text-decoration: none;
    color: rgb(140,140,140);
    display: block;
  }

  .box-drop__list__item a:hover {
    color: rgb(30,30,30);
  }

  .box-drop__list__item span {
    display: block;
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(230,230,230);
  }

  .box-drop__list__item:last-of-type span {
    border-bottom: none;
  }

  .box-drop-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .box-drop-display-right {
    left: 0px;
    min-width: 350px;
  }

  .box-drop-display-right:before {
    left: 10px;
  }
</style>
