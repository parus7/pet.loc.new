<template>
  <Page
    :employees="employees"
    :message="message"
    :length="getTodayBirthday()"
    :isMain="isMain"
    @deleteEmployee="onDeleteInBasic($event)"
  >
    <template #pageMainHeader>
      <PageMainHeader
        class="page_header__main "
        :isAlphabet="isAlphabet"
        @employeeCreate="onCreateEmployee($event)"
        @filterEmployee="onFilterBasicData($event)"
        @resetFilter="onResetFilter"
        @alphabetSort="onAlphabetSort"
      >
      </PageMainHeader>
    </template>

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
      isAlphabet: false,
      filteredEmployees: {},

      queryRoutValue: null,
      queryRoutParam: null
    };
  },

  created() {
    this.queryRoutValue = this.$route.query.value;
    this.queryRoutParam = this.$route.query.param;

    if (this.getEmptyStore("employees")) {
      this.setMapEmployees(employeesData, "employees").values();
    }

    let employeeBasic = this.alphabetSortStart([...this.getAllEmployeesArray("employees")]);

    if (this.queryRoutValue && this.queryRoutParam) {
      this.employees = employeeBasic.filter(
        (elem) => elem[this.queryRoutParam].toLowerCase() === this.queryRoutValue
      );
    } else {
      this.employees = employeeBasic;
    }
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployeesArray"
    ])
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "createEmployee",
      "alphabetToggle",
      "saveInArchive",
      "alphabetSortStart",
      "alphabetSortEnd",
      "createNextId"
    ]),

    getTodayDate() {
      let day = String(new Date().getDate());
      day.length === 1 ? (day = "0" + day) : day;

      let month = String(new Date().getMonth() + 1);
      month.length === 1 ? (month = "0" + month) : month;

      return day + month;
    },

    getTodayBirthday() {
      const day = this.getTodayDate();
      this.length = [...this.employees].filter((elem) => elem["birthday"] === day).length;
      return this.length;
    },

    onFilterBasicData(event) {
      this.employees = this.queryRoutValue === null && this.queryRoutParam === null ?
        [...this.getAllEmployeesArray("employees")]

        : [...this.getAllEmployeesArray("employees")].filter(
          (elem) => elem[event.param].toLowerCase() === event.value
        );

      this.employees = this.alphabetSortStart(this.employees);

      this.message =
        this.employees.length === 0
          ? "Нет сотрудников, соответствующих вашему поиску"
          : "";
    },

    sortingAlphabet() {
      this.employees =
        this.isAlphabet === false
          ? this.alphabetSortStart([...this.getAllEmployeesArray("employees")])
          : this.alphabetSortEnd([...this.getAllEmployeesArray("employees")]);
    },

    onAlphabetSort() {
      this.isAlphabet = this.alphabetToggle();
      this.sortingAlphabet();
    },

    onResetFilter() {
      return this.employees =
        this.isAlphabet === false
          ? this.alphabetSortStart([...this.getAllEmployeesArray("employees")])
          : this.alphabetSortEnd([...this.getAllEmployeesArray("employees")]);
    },

    onDeleteInBasic(event) {
      this.saveInArchive(event.id);
      this.sortingAlphabet();

      this.message =
        this.employees.length === 0 ? "Список сотрудников пуст" : "";
    },

    onCreateEmployee() {
      const id = this.createNextId();

      this.$router.push({
        name: "newCard",
        params: { id: id }
      });

      this.createEmployee();
    }
  }
};
</script>

<style>
.page_header__main {
  grid-column: 1/-1;
}
</style>