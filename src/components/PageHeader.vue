<template>
  <div class="header help relative" data-name="на главную страницу">
    <TheButton
      area-label="на главную страницу"
      tabindex="0"
      @click="leavePage">
      <IconGoTo />
    </TheButton>
  </div>
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapActions } from "pinia";

import IconAdd from "@/components/icons/IconAdd.vue";
import IconAlphabet from "@/components/icons/IconAlphabet.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

import ThePopup from "@/components/ThePopup.vue";
import TheButton from "@/components/UI/TheButton.vue";
import IconGoTo from "@/components/icons/IconGoTo.vue";
import { vMaska } from "maska";

export default {
  components: { IconSearch, IconAlphabet, IconAdd, ThePopup, TheButton, IconGoTo },
  directives: { maska: vMaska },

  props: {
    link: String
  },

  methods: {
    leavePage() {
      this.$router.push({
        name: this.link
      });
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  gap: 20px;

  background-color: var(--vt-c-archive-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-5);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

/*.list {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  gap: 10px;*/
/*}*/

.list__message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}

</style>
