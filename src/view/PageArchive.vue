<template>
  <Page
    :employees="employees"
    :message="message"
  >

    <template #pageHeader>
      <PageHeader>

        <template #inputArchiveSearch>
          <input
            id="search"
            type="text"
            class="header__form-search"
            ref="archiveSearch"
            aria-label="поле поиска"
            placeholder="Поиск..."
            v-model="inputValue"
            @input="filterArchiveData"
          />
        </template>

      </PageHeader>
    </template>

  </Page>
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesArchive from "@/data/employeesArchive.json";

import Page from "@/components/Page.vue";
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: { Page, PageHeader },

  data() {
    return {
      employees: [],
      inputValue: "",
      message: ""
    };
  },

  created() {
    this.inputValue = this.$route.query.value;

    this.getEmptyStore("archive")
      ? this.setMapEmployees(employeesArchive, "archive")
      : [];
  },

  mounted() {
    this.$refs.archiveSearch.focus();

    this.filterArchiveData();

    this.message =
      this.employees.length !== 0 && this.inputValue !== ""
        ? "Нет сотрудников, соответствующих вашему поиску"

        : this.employees.length === 0
          ? "Архивный список сотрудников пуст"
          : "";
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesArray"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees", "alphabetSortStart"]),

    filterArchiveData() {
      this.employees = this.inputValue ?
        this.alphabetSortStart([...this.getAllEmployeesArray("archive")].filter((elem) =>
          elem["last_name"].toLowerCase().startsWith(this.inputValue.toLowerCase())))

        : this.alphabetSortStart([...this.getAllEmployeesArray("archive")]);

      this.$router.push({ name: "archive", query: { value: this.inputValue } });
    }
  }
};
</script>

<style scoped>
#search {
  width: 60%;
}
</style>
