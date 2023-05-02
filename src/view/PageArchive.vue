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

    this.employees = [...this.employees.values()].sort((a, b) => a.cn.localeCompare(b.cn));
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesMap"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees"]),

    filterArchiveData(event) {
      const valueSearch = event.param.slice(0, 1).toUpperCase() + event.param.slice(1);
      console.log(valueSearch);
    }
  }
};
</script>

<style scoped>

</style>

