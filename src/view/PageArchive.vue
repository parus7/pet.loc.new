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
      : this.message = this.setMessage("archive");

    this.filterArchiveData();
  },

  mounted() {
    this.$refs.archiveSearch.focus();
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesArray"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees", "alphabetSortStart", "setMessage"]),

    filterArchiveData() {
      let archiveEmployees = this.alphabetSortStart([...this.getAllEmployeesArray("archive")]);

      this.employees = this.inputValue ?
        archiveEmployees.filter((elem) =>
          elem["last_name"].toLowerCase().startsWith(this.inputValue.toLowerCase()))
        : archiveEmployees;

      this.$router.push({ name: "archive", query: { value: this.inputValue } });
      this.message = this.setMessage("archive");
    }
  }
};
</script>

<style scoped>
#search {
  width: 60%;
}
</style>
