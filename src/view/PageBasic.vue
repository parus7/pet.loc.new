<template>
  <Page
    :employees="employees"
    :message="message"
    :length="getTodayBirthday()"
    :isMain="isMain"
    @deleteEmployee="onDeleteInBasic($event)"
  >
    <PageMainHeader
      class="page_header__main "
      @employeeCreate="onCreateEmployee($event)"
      @filterEmployee="filterBasicData($event)"
      @resetFilter="onResetFilter"
      @alphabetSort="alphabet"
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
      isAlphabet: false,
      employeeBasic: {},

      queryRoutValue: "",
      queryRoutParam: ""
    };
  },

  created() {
    this.queryRoutValue = this.$route.query.value;
    this.queryRoutParam = this.$route.query.param;

    if (this.getEmptyStore("employees")) {
      this.setMapEmployees(employeesData, "employees").values();
    }

    this.employeeBasic = this.alphabetFilterStart([...this.getAllEmployeesArray("employees")]);

    if (this.queryRoutValue && this.queryRoutParam) {
      this.employees = this.employeeBasic.filter(
        (elem) => elem[this.queryRoutParam] === this.queryRoutValue
      );
    } else {
      this.employees = this.employeeBasic;
    }
    console.log(this.isAlphabet, "created");
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployeesArray",
      "delEmployee"
    ])
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "createEmployee",
      "alphabetToggle",
      "saveInArchive",
      "alphabetFilterStart",
      "alphabetFilterEnd",
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

    filterBasicData(event) {
      this.employees = this.queryRoutValue === "" && this.queryRoutParam === "" ?
        [...this.getAllEmployeesArray("employees")]

        : [...this.getAllEmployeesArray("employees")].filter(
          (elem) => elem[event.param] === event.value
        );

      this.employees = this.alphabetFilterStart(this.employees);

      this.message =
        this.employees.length === 0
          ? "Нет сотрудников, соответствующих вашему поиску"
          : "";
      console.log(this.isAlphabet, "filterBasicData");
    },

    onAlphabet() {
      this.employees =
        this.isAlphabet === false
          ? this.alphabetFilterStart([...this.getAllEmployeesArray("employees")])
          : this.alphabetFilterEnd([...this.getAllEmployeesArray("employees")]);

      console.log(this.isAlphabet, "onAlphabet");
    },

    alphabet() {
      this.isAlphabet = this.alphabetToggle();
      this.onAlphabet();
    },

    onResetFilter() {
      return this.employees =
        this.isAlphabet === false
          ? this.alphabetFilterStart([...this.getAllEmployeesArray("employees")])
          : this.alphabetFilterEnd([...this.getAllEmployeesArray("employees")]);
      // console.log(this.isAlphabet, "onResetFilter");
    },

    onDeleteInBasic(event) {
      // console.log(this.isAlphabet, "delete");
      this.saveInArchive(event.id);
      this.onAlphabet();

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
      console.log(this.isAlphabet, "onCreateEmployee");
    }
  }
};
</script>

<style>
.page_header__main {
  grid-column: 1/-1;
}
</style>