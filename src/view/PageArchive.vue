<template>
  <Page
    :employees="employees"
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
      inputValue: ""
    };
  },

  created() {
    this.inputValue = this.$route.query.value;

    let employeeArchive;

    if (this.getEmptyStore("archive")) {
      this.setMapEmployees(employeesArchive, "archive");
    }

    employeeArchive = this.alphabetSortStart([...this.getAllEmployeesArray("archive")]);

    if (this.inputValue) {
      this.employees = employeeArchive.filter((elem) => {
        return elem["last_name"].toLowerCase().startsWith(this.inputValue.toLowerCase());
      });

    } else {
      this.employees = employeeArchive;
    }
  },

  mounted() {
    this.$refs.archiveSearch.focus();
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesMap", "getAllEmployeesArray"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees", "alphabetSortStart"]),

    filterArchiveData() {
      this.employees = this.inputValue === "" ?
        [...this.getAllEmployeesArray("archive")]
        : [...this.getAllEmployeesArray("archive")].filter((elem) =>
          elem["last_name"].toLowerCase().startsWith(this.inputValue.toLowerCase()));

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
