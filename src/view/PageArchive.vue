<template>
  <Page
    :employees="employees"
    :isMain="isMain"
    :link="link"


  />
<!--  @deleteEmployee="onDeleteInArchive($event)"-->
<!--  @click="leavePage"-->
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
      isMain: false,
      link: 'basic'
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


    // onDeleteInArchive(event) {
    //   console.log(event.id);
    //   this.employees = this.getAllEmployeesMap("archive").delete(event.id);
    //   this.employees = [...this.employees.values()].sort((a, b) => a.cn.localeCompare(b.cn));
    //   // console.log(  employeesDel);
    //   // this.employees = employeesDel;
    // },
  }
};
</script>

<style scoped>
/*.list {*/
/*  padding: 17px;*/
/*}*/

/*.list__message {*/
/*  color: var(--vt-c-grey-font);*/
/*  text-align: center;*/
/*  margin: 40px 0;*/
/*}*/
</style>

