<template>
  <div class="styled-checkbox-container">
    <input
      class="styled-checkbox"
      type="checkbox"
      :checked="checked"
      :id="id"
      :name="name"
      @change="$emit('change', $event.target.checked)"
    />

    <label :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    id: String,
    name: String,
    label: String,
    checked: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.styled-checkbox-container {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.styled-checkbox {
  position: absolute;
  opacity: 0;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: "\e8a7";
    font-size: 0;
    font-family: "Material-Design-Icons";
    color: white;
    margin-right: 10px;
    display: inline-block;
    vertical-align: bottom;
    border-radius: 4px;
    width: 20px;
    height: 20px;
    background: #C7CDD4;
    transition: font-size 0.38s cubic-bezier(0.645, 0.045, 0.355, 1.000);
    transition-property: background-color, font-size;
    transition-duration: 0.09s, 0.24s;
    text-align: center;
    -webkit-user-select: none;
    user-select: none;
  }

  // Box hover
  &:hover + label:before {
    background: #B0B9C2;
  }

  // Box active
  &:active + label:before {
    background: #86929E;
  }

  // Box focus
  &:focus + label:before {
    box-shadow: 0 0 0 3px #DFE3E8;
  }

  // Box checked
  &:checked + label:before {
    background: #21C29A;
    font-size: 1em;
  }

  // Checked box active
  &:checked:active + label:before {
    background: #008060;
  }

  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background: #DFE3E8;
  }
}
</style>
