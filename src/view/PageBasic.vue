<template>
  <Page
    :employees="employees"
    :isAlphabet="isAlphabet"
    :message="message"
    :length="length"
    :isMain="isMain"
    @deleteEmployee="onDelete($event)"
  >

    <PageMainHeader
      class="page_header__main"
      @alphabetFilter="onAlphabet($event)"
      @employeeFilter="filterData($event)"
      @employeeCreate="onCreateEmployee($event)"
    >
    </PageMainHeader>

  </Page>
</template>

<script>
import Page from "@/components/Page.vue";
import PageMainHeader from "@/components/PageMainHeader.vue";

import { mapState, mapActions } from "pinia";
import { useEmplStore } from "@/stores/EmplStore";
import employeesData from "@/data/employeesData.json";

export default {
  components: { Page, PageMainHeader },

  data() {
    return {
      employees: {},
      isAlphabet: null,

      message: "",
      length: null,

      isMain: true
    };
  },

  created() {
    this.employees = this.getEmptyStore("employees")
      ? this.setMapEmployees(employeesData, "employees").values()
      : [...this.getAllEmployeesArray("employees")];

    this.isAlphabet = this.getAlphabet;
    this.onAlphabet();
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

    filterData(event) {
      this.isAlphabet = this.alphabetToggle();

      this.employees = [...this.getAllEmployeesArray("employees")].filter(
        (elem) => elem[event.param] === event.value
      );

      this.message =
        this.employees.length === 0
          ? "Нет сотрудников, соответствующих вашему поиску"
          : "";
    },

    onAlphabet() {
      this.isAlphabet = this.alphabetToggle();

      this.employees =
        this.isAlphabet === false
          ? [...this.getAllEmployeesArray("employees")].sort((a, b) =>
            a.cn.localeCompare(b.cn)
          )
          : [...this.getAllEmployeesArray("employees")].sort((a, b) =>
            b.cn.localeCompare(a.cn)
          );

      return this.employees;
    },

    onDelete(event) {
      this.isAlphabet = this.alphabetToggle();

      this.saveInArchive(event.id);
      this.employees = [...this.getAllEmployeesArray("employees")];

      this.message =
        this.employees.length === 0 ? "Список сотрудников пуст" : "";

      this.onAlphabet();
    },

    onCreateEmployee() {
      this.createEmployee();
      this.onAlphabet();
    }
  }
};
</script>

<style>

</style>