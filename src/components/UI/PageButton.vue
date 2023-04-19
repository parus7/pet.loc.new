<template>
  <button type="button" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "PageButton"
};
</script>

<style scoped>
.button {
  color: var(--vt-c-white);
  text-transform: uppercase;
  background-color: var(--vt-c-active-5);
  outline-color: var(--vt-c-outline);
  border: none;
  box-shadow: 5px 4px 4px 1px var(--vt-c-active-2);
  border-radius: 8px;
  padding: 3px 25px;
}

.button:hover {
  opacity: 0.8;
  transition: opacity 0.5s;
}

.button:active {
  opacity: 0.5;
  transition: opacity 0.5s;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-2);
}
</style>
