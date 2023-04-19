<template>
  <RouterLink :to="{ name: 'basic' }" tabindex="-1">
    <div class="header help relative" data-name="на главную страницу">
      <PageButton
        area-label="на главную страницу"
        tabindex="0"
      >
        <IconGoTo />
      </PageButton>
    </div>
  </RouterLink>
</template>

<script>
import IconAdd from "@/components/icons/IconAdd.vue";
import IconAlphabet from "@/components/icons/IconAlphabet.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

import PagePopup from "@/components/PagePopup.vue";
import PageButton from "@/components/UI/PageButton.vue";
import IconGoTo from "@/components/icons/IconGoTo.vue";

import { vMaska } from "maska";

export default {
  components: { IconSearch, IconAlphabet, IconAdd, PagePopup, PageButton, IconGoTo },
  directives: { maska: vMaska },

  props: {
    isMain: Boolean
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: end;

  background-color: var(--vt-c-archive-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-5);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
