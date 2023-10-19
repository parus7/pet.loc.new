<template>
  <div class="secondary-header"
       :class="{ 'color-theme__secondary': !isMain }"
  >
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
  components: { PageColorButton, IconGoTo },

  props: {
    isMain: Boolean
  }
};

</script>

<style scoped>
.secondary-header {
  display: flex;
  justify-content: end;
  column-gap: 5%;
  border-radius: 8px;
  padding: 10px;
  margin: 0;
}

.tooltip-position:hover::after {
  right: 0;
}
</style>
