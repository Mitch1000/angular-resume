<!--
NavigationButton

The buttons used in the Global navigator
-->
<template>
  <li class="navigation-button">
    <button
      @click="buttonAction"
      class="account-settings-action action-btn action-btn--material"
    >
      <i 
        :class="{
          'fa fa-bell': buttonActive,
          'fa fa-bell-o': !buttonActive
        }"
      >
      </i>
    </button>
    <slot/>
  </li>
</template>

<script>
export default {
  name: 'NavigationButton',

  props: {
    buttonAction: {
      type: Function,
      default: () => false,
    },
    buttonActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/_navigation.scss';

  .navigation-button {
    padding-right: 30px;
    float: left;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    display: flex;
    display: -webkit-box;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
  }

  .action-btn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    color: white;
    border: 1px solid;
    background-color: transparent;
    font-size: 1.3rem;
    outline: none;
    cursor: pointer;
    padding: 0px;
    line-height: 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    @include box-sizing(border-box);
    @include transition( background-color 0.15s, color 0.15s, border 0.15s, box-shadow 0.15s );
  
    .material-icons {
      font-size: 20px;
    }
  }

</style>
