<template>
  <button type="button" class="button-icon">
    <slot></slot>
  </button>
</template>

<style scoped>
.button-icon {
  width: 37px;
  height: 32px;
  border: none;
  outline-color: var(--vt-c-outline);
  background: inherit;
  border-radius: 6px;
  box-shadow: 1px 1px 0 0 var(--vt-c-active-2);
  padding: 0;
}

.button-icon:active {
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-4);
}

@media screen and (max-width: 767px) {
  .button-icon {
    width: 48px;
  }
}
</style>
