<template>
  <Page
    :employees="employees"
  >

    <PageHeader
      :isArchive="isArchive"
      @searchArchiveEmpl="filterArchiveData($event)"
    />

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
      isArchive: true,
      queryRout: ""
    };
  },

  created() {
    this.queryRout = this.$route.query.value;
    let empl;

    if (this.getEmptyStore("archive")) {
      this.setMapEmployees(employeesArchive, "archive");
    }

    empl = this.alphabetFilterStart("archive");

    if (this.queryRout) {
      this.employees = empl.filter((elem) => {
        return elem["last_name"].toLowerCase().startsWith(this.queryRout.toLowerCase());
      });

    } else {
      this.employees = empl;
    }
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployeesMap",
      "getAllEmployeesArray"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees", "alphabetFilterStart"]),

    filterArchiveData(event) {
      this.employees = event.params === "" ?
        [...this.getAllEmployeesArray("archive")]
        : [...this.getAllEmployeesArray("archive")].filter((elem) =>
          elem["last_name"].toLowerCase().startsWith(event.params.toLowerCase()));
    }
  }
};
</script>
