<template>

  <button
    type="button"
    class="color-button"
    :disabled="disabled"
  >
    <slot><!-- icon || text --></slot>
  </button>

</template>

<script>
export default {
  name: "PageColorButton",

  props: {
    disabled: Boolean
  }
};
</script>

<style scoped>
.color-button {
  color: var(--vt-c-white);
  text-transform: uppercase;
  background-color: var(--vt-c-active-4);
  outline-color: var(--vt-c-outline);
  border: none;
  box-shadow: 4px 3px 3px 1px var(--vt-c-active-2);
  border-radius: 8px;
  padding: 5px 25px;
}

.color-button:hover {
  transform: scale(1.03);
  box-shadow: 5px 5px 5px 2px var(--vt-c-active-2);
}

.color-button:active {
  transform: scale(1);
  box-shadow: none;
  opacity: 1;
}

.color-button:disabled {
  opacity: 0.55;
}
</style>
