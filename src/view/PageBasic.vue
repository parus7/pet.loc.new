<template>

  <PageSpinner v-if="isReset" />

  <Page
    :employees="employees"
    :message="message"
    :amountBirthdays="getTodayBirthday"
    :isMain="isMain"
    :isMarked="isMarked"
    @deleteEmployee="onDeleteInBasic($event)"
  >

    <template #pageMainHeader>
      <PageMainHeader
        class="page_header__main "
        :isAlphabet="isAlphabet"
        :employeesLength="employees.length"
        :message="message"
        @employeeCreate="onCreateEmployee($event)"
        @filterEmployee="onFilterBasicData($event, this.employees)"
        @resetFilter="onResetFilter"
        @alphabetSort="onAlphabetSort"
        @resetMarks="resetColorMarks($event)"
      >
      </PageMainHeader>
    </template>

  </Page>
</template>

<script>
import Page from "@/components/Page.vue";
import PageMainHeader from "@/components/PageMainHeader.vue";
import PageSpinner from "@/components/PageSpinner.vue";

import { mapState, mapActions } from "pinia";
import { useEmplStore } from "@/stores/EmplStore";

export default {
  components: { Page, PageMainHeader, PageSpinner },

  data() {
    return {
      employees: {},
      message: "",
      amountBirthdays: null,
      isMain: true,
      isAlphabet: false,
      isMarked: null,
      isReset: false,
      filteredEmployees: [],
      employeesLength: null,

      queryRoutValue: null,
      queryRoutCategory: null
    };
  },

  created() {
    this.queryRoutValue = this.$route.query.value;
    this.queryRoutCategory = this.$route.query.category;

    if (this.getEmptyStore("employees")) {
      this.getEmployeesBackend("employees");
    }

    let employeeBasic = this.alphabetSortStart([...this.getAllEmployeesArray("employees")]);

    this.employees = this.queryRoutValue && this.queryRoutCategory
      ? employeeBasic.filter(
        (elem) => elem[this.queryRoutCategory].toLowerCase() === this.queryRoutValue)
      : this.employees = employeeBasic;

    this.message = this.setMessage("employees");
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesArray"]),

    getTodayBirthday() {
      let day = String(new Date().getDate());
      day.length === 1 ? (day = "0" + day) : day;

      let month = String(new Date().getMonth() + 1);
      month.length === 1 ? (month = "0" + month) : month;

      return this.amountBirthdays = ([...this.getAllEmployeesArray("employees")].filter(
        (elem) => elem["birthday"] === day + month).length);
    }
  },

  methods: {
    ...mapActions(useEmplStore, [
      "getEmployeesBackend",
      "setMapEmployees",
      "createEmployee",
      "alphabetToggle",
      "saveInArchive",
      "alphabetSortStart",
      "alphabetSortEnd",
      "createNextId",
      "setMessage",
      "delEmployee"
    ]),

    resetColorMarks(event) {
      setTimeout(() => {
        this.isReset = true;
        this.isMarked = event.mark;
      }, 4444);
    },

    onFilterBasicData(event) {
      this.employees = event.category && event.value
        ? this.employees.filter((elem) => elem[event.category].toLowerCase() === event.value)
        : this.employees;

      this.message = this.setMessage("employees");

      this.filteredEmployees = this.employees;
    },

    sortingAlphabet(obj) {
      if (!this.isAlphabet && !this.filteredEmployees.length) {
        return this.employees = this.alphabetSortStart(obj);

      } else if (this.isAlphabet && !this.filteredEmployees.length) {
        return this.employees = this.alphabetSortEnd(obj);

      } else if (!this.isAlphabet && this.filteredEmployees.length) {
        return this.employees = this.alphabetSortStart(this.filteredEmployees);

      } else if (this.isAlphabet && this.filteredEmployees.length) {
        return this.employees = this.alphabetSortEnd(this.filteredEmployees);
      }
    },

    onAlphabetSort() {
      this.isAlphabet = this.alphabetToggle();
      this.sortingAlphabet(this.employees);
    },

    onResetFilter() {
      this.filteredEmployees = [];
      this.employees = this.sortingAlphabet([...this.getAllEmployeesArray("employees")]);
    },

    onDeleteInBasic(event) {
      this.saveInArchive(event.id);
      this.delEmployee(event.id);

      this.filteredEmployees.length
        ? this.filteredEmployees.splice(
          this.filteredEmployees.indexOf(
            this.employees.find(elem => elem.id === event.id)), 1)

        : this.employees = this.employees.filter(elem => elem.id !== event.id);

      this.message = "";
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
