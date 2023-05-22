<template>
  <button type="button" class="icon-button">
    <slot></slot>
    <!--    <slot name="iconInButton"></slot>-->
  </button>
</template>

<script>
export default {
  name: "PageIconButton"
};
</script>


<style scoped>
.icon-button {
  width: 37px;
  height: 32px;
  border: none;

  outline-color: var(--vt-c-outline);
  background: inherit;
  border-radius: 6px;
  box-shadow: 1px 1px 0 0 var(--vt-c-active-2);
  padding: 0;
}

.icon-button:active {
  box-shadow: 2px 2px 2px 2px var(--vt-c-active-5);
}

@media screen and (max-width: 767px) {
  .icon-button {
    width: 48px;
  }
}
</style>
