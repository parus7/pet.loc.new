<template>
  <div class="secondary-header">
    <slot name="inputArchiveSearch"></slot>
    <RouterLink
      :to="{ name: 'basic' }"
      tabindex="-1">

      <div
        class="tooltip  tooltip-position" data-name="на&nbsp;главную&nbsp;страницу">
        <PageColorButton
          area-label="на главную страницу"
          tabindex="0"
        >
          <IconGoTo />
        </PageColorButton>
      </div>

    </RouterLink>

  </div>
</template>

<script>
import PageColorButton from "@/components/UI/PageColorButton.vue";
import IconGoTo from "@/components/icons/IconGoTo.vue";

export default {
  components: { PageColorButton, IconGoTo }
};

</script>

<style scoped>
.secondary-header {
  display: flex;
  justify-content: end;
  column-gap: 30px;
  grid-column: 1/-1;

  background-color: var(--vt-c-active-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-4);
  border-radius: 8px;
  padding: 10px;
}

.tooltip-position:hover::after {
  right: 0;
}

@media screen and (max-width: 425px) {
  .secondary-header {
    column-gap: 20px;
  }
}
</style>
