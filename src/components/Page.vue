<template>
  <div class="page">

    <template v-if="isMain">
      <slot></slot>

      <PageBar
        class="page_bar"
        :length="length"
      />
    </template>

    <template v-else>
      <PageHeader
        class="page_header__secondary"
        :isMain="isMain"
      />
    </template>

    <PageList
      class="page_list"
      :employees="[...employees]"
      :message="message"
      :isMain="isMain"
      @deleteEmployee="$emit('deleteEmployee',  $event )"
    />
  </div>
</template>

<script>
import PageMainHeader from "@/components/PageMainHeader.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageBar from "@/components/PageBar.vue";
import PageList from "@/components/PageList.vue";

import { mapActions, mapState } from "pinia";
import { useEmplStore } from "@/stores/EmplStore";

export default {
  components: { PageMainHeader, PageHeader, PageList, PageBar },

  props: {
    employees: Object,
    message: String,
    length: Number,
    isMain: Boolean
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployeesArray",
      "delEmployee",
      "getAlphabet"
    ])
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "createEmployee",
      "alphabetToggle",
      "saveInArchive"
    ]),

    leavePage() {
      this.$router.push({
        name: this.link
      });
    }
  }
};
</script>

<style>
.page {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 55px  calc(100vh - 55px);
  gap: 10px;
  padding: 17px;
  margin: 0 auto;
}

.page_header__secondary {
  grid-column: 1/-1;
}

.page_bar {
  grid-column: 1/2;
  grid-row: 2/4;
}

.page_list {
  grid-column: 2/3;
}

@media screen and (max-width: 991px) {
  .page {
    grid-template-rows: 55px 55px calc(100vh - 110px);
  }

  .page_list {
    grid-column: 1/-1;
  }

  .page_bar {
    grid-row: 1/2;
    grid-column: 1/-1;
  }
}

@media screen and (max-width: 729px) {
  .page {
    grid-template-rows: 55px 9vh calc(91vh - 55px);
  }
}

@media screen and (max-width: 499px) {
  .page {
    grid-template-rows: 55px 20vh calc(80vh - 55px);
  }
}
</style>
