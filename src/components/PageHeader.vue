<template>
  <div class="secondary-header">

    <slot>
      <!--   input  archiveSearch in PageArchive-->
    </slot>

    <RouterLink
      :to="{ name: 'basic' }"
      tabindex="-1">

      <div
        class=" help " data-name="на главную страницу">
        <PageButton
          area-label="на главную страницу"
          tabindex="0"
        >
          <IconGoTo />
        </PageButton>
      </div>

    </RouterLink>

  </div>
</template>

<script>
import PageButton from "@/components/UI/PageButton.vue";
import IconGoTo from "@/components/icons/IconGoTo.vue";

export default {
  components: { PageButton, IconGoTo }
};

</script>

<style scoped>
.secondary-header{
  display: flex;
  justify-content: end;
  column-gap: 30px;
  grid-column: 1/-1;

  background-color: var(--vt-c-archive-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-5);
  border-radius: 8px;
  padding: 10px;
}

@media screen and (max-width: 425px) {
  .secondary-header{
    column-gap: 20px;
  }
}
</style>
