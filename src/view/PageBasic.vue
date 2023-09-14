<template>

  <PageSpinner v-if="isReset" />

  <Page
    :employees="employees"
    :message="message"
    :amountBirthdays="getTodayBirthday()"
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
      todayDate: "",
      employees: [],
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
    this.getEmplFromStore();

    this.queryRoutValue = this.$route.query.value;
    this.queryRoutCategory = this.$route.query.category;

    this.employees = this.queryRoutValue && this.queryRoutCategory
      ? this.employees.filter(
        (elem) => elem[this.queryRoutCategory].toLowerCase() === this.queryRoutValue)
      : this.employees;
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployeesArray"]),

    // для выяснения сегодняшней даты
    // в опреденном формате для функции getTodayBirthday
    giveTodayDate() {
      let day = String(new Date().getDate());
      day.length === 1 ? (day = "0" + day) : day;

      let month = String(new Date().getMonth() + 1);
      month.length === 1 ? (month = "0" + month) : month;

      this.todayDate = day + month;
      console.log(this.todayDate);
    }
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setEmployeesBackend",
      "createEmployee",
      "alphabetToggle",
      "saveInArchive",
      "alphabetSortStart",
      "alphabetSortEnd",
      "createNextId",
      "setMessage",
      "delEmployee"
    ]),

    // для получения данных с сервера, их форматирование и сортировка для отрисовки (нужно в Page)
    async getEmplFromStore() {
      if (this.getEmptyStore("employees")) {
        await this.setEmployeesBackend("employees");

        this.employees = this.formattingEmplData();
        // console.log(this.employees);
      } else {
        this.employees = this.formattingEmplData();
      }

      this.message = this.setMessage("employees");
    },

    // для выяснения количества именинников на сегодняшнюю дату (нужно в PageBar на строке 12)
    getTodayBirthday() {
      return this.amountBirthdays = ([...this.getAllEmployeesArray("employees")].filter(
        (elem) => elem["birthday"] === this.todayDate).length);
    },

    // для получения отформатированных данных из стора и их алфавитная сортировка
    formattingEmplData() {
      return this.employees = this.alphabetSortStart(
        [...this.getAllEmployeesArray("employees")]);
    },

    // для проверки работы спиннера без сервера
    resetColorMarks(event) {
      setTimeout(() => {
        this.isReset = true;
        this.isMarked = event.mark;
      }, 4444);
    },

    // для сортировки данных по категории в PageMainHeader
    onFilterBasicData(event) {
      this.employees = event.category && event.value
        ? this.employees.filter((elem) => elem[event.category].toLowerCase() === event.value)
        : this.employees;

      this.message = this.setMessage("employees");

      this.filteredEmployees = this.employees;
    },

    // для алфавитной сортировки данных сотрудников
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

    // переключение сортировки от А-Я  в  Я-А и наоборот
    onAlphabetSort() {
      this.isAlphabet = this.alphabetToggle();
      this.sortingAlphabet(this.employees);
    },

    // сброс фильтра по категории
    onResetFilter() {
      this.filteredEmployees = [];
      this.employees = this.sortingAlphabet([...this.getAllEmployeesArray("employees")]);
    },

    // удаление сотрудника и перенос его в архив
    // тут еще будут переделки из-за архива и сервера
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

    // создание нового сотрудника
    // тут еще будут переделки из-за сервера
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
