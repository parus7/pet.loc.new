<template>
  <div class="header">

    <template v-if="isArchive">
      <input
        id="search"
        type="text"
        class="header__form-search"
        aria-label="поле поиска"
        placeholder="Поиск..."
        @input="$emit('searchArchiveEmpl', { param: $event.target.value})"
      />
    </template>

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
import IconGoTo from "@/components/icons/IconGoTo.vue";
import PageButton from "@/components/UI/PageButton.vue";

import { vMaska } from "maska";

export default {
  components: { PageButton, IconGoTo },
  directives: { maska: vMaska },

  props: {
    isArchive: Boolean
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  column-gap: 30px;
  grid-column: 1/-1;

  background-color: var(--vt-c-archive-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-5);
  border-radius: 8px;
  padding: 10px;
}
</style>
