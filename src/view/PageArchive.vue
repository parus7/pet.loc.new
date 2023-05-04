<template>
  <Page
    :employees="employees"
    :link="link"
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
      employees: {},
      isArchive: true,
      link: "basic"
    };
  },

  created() {
    this.employees = this.getEmptyStore("archive")
      ? this.setMapEmployees(employeesArchive, "archive")
      : this.getAllEmployeesMap("archive");

    this.employees = this.alphabetFilterStart("archive");
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesMap", "getAllEmployeesArray"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees", "alphabetFilterStart"]),

    filterArchiveData(event) {
      const valueSearch = event.param.slice(0, 1).toUpperCase() + event.param.slice(1);

      this.employees = valueSearch === "" ?
        this.alphabetFilterStart("archive")
        : [...this.employees.values()].filter((elem) => elem["last_name"].startsWith(valueSearch));
    }
  }
};
</script>
