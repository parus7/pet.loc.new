<template>
  <label class="label">{{ labelValue }}
    <input
      class="input"
      type="text"
      :id="inputValue"
      :aria-label=" ariaLabel"
      :v-model="inputValue"
      :v-maska="vMaska"
      :data-maska="dataMaska"
      :disabled="disabled"
      :required="required"
    />
  </label>
</template>

<script>
export default {
  name: "TheInput",

  props: {
    labelValue: {
      type: String,
      default: " "
    },

    inputValue: {
      type: String,
      default: ""
    },

    ariaLabel: {
      type: String,
      default: " "
    },

    vMaska: {
      type: String,
      default: " "
    },

    dataMaska: {
      type: String,
      default: " "
    },

    disabled: {
      type: Boolean,
      default: " true"
    },

    required: {
      type: Boolean,
      default: " false"
    }
  }
};
</script>

<style scoped>
.label {
  display: grid;
  grid-template-columns: 90px 1fr;
  align-items: center;
  margin-bottom: 15px;
}

.input {
  font-family: inherit;
  font-style: italic;
  background: var(--vt-c-white);
  border: none;
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 9px;
  outline-color: var(--vt-c-outline);
  font-size: inherit;
  color: inherit;
  appearance: none;
  padding: 5px 15px;
}

.input:disabled {
  font-style: normal;
  background: none;
}

.input-mask {
  background: inherit;
  box-shadow: none;
  font-style: normal;
  outline: none;
  padding: 0;
}
</style>
