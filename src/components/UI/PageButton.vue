<template>

  <button type="button" class="button">
    <slot><!--  icon --></slot>
  </button>

</template>

<script>
export default {
  name: "PageButton"
};
</script>


<style scoped>
.button {
  width: 37px;
  height: 32px;
  border: none;

  outline-color: var(--vt-c-outline-10);
  background: inherit;
  border-radius: 6px;
  box-shadow: 1px 1px 0 0 var(--vt-c-active-2);
  padding: 0;
}

.button:hover {
  box-shadow: 2px 2px 1px 1px var(--vt-c-active-2);
}

.button:active {
  box-shadow: 1px 0 0 0 var(--vt-c-active-2);
}

@media screen and (max-width: 767px) {
  .button {
    width: 48px;
  }
}
</style>
