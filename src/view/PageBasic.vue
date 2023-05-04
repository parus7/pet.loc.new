<template>
  <Page
    :employees="employees"
    :message="message"
    :length="length"
    :isMain="isMain"
    @deleteEmployee="onDeleteInBasic($event)"
  >
    <PageMainHeader
      class="page_header__main "
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
      message: "",
      length: null,
      isMain: true,
      link: "basic"
    };
  },

  created() {
    this.employees = this.getEmptyStore("employees")
      ? this.setMapEmployees(employeesData, "employees").values()
      : [...this.getAllEmployeesArray("employees")];

    this.onAlphabet();

    const day = this.getTodayDate();
    this.length = [...this.employees].filter((elem) => elem.birthday === day).length;
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
      "saveInArchive",
      "alphabetFilterStart",
      "alphabetFilterEnd"
    ]),

    getTodayDate() {
      let day = String(new Date().getDate());
      day.length === 1 ? (day = "0" + day) : day;

      let month = String(new Date().getMonth() + 1);
      month.length === 1 ? (month = "0" + month) : month;

      return day + month;
    },

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
          ? this.alphabetFilterStart("employees")
          : this.alphabetFilterEnd("employees");

      return this.employees;
    },

    onDeleteInBasic(event) {
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
.page_header__main {
  grid-column: 1/-1;
}
</style>