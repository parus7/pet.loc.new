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
    this.dataToStore();

    this.queryRoutValue = this.$route.query.value;
    this.queryRoutCategory = this.$route.query.category;

    this.employees = this.queryRoutValue && this.queryRoutCategory
      ? this.employees.filter(
        (elem) => elem[this.queryRoutCategory].toLowerCase() === this.queryRoutValue)
      : this.employees;
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployeesArray"
    ])
  },

  methods: {
    ...mapActions(useEmplStore, [
      "giveTodayDate",
      "formatStoreData",
      "dataPutBackend",
      "dataGetBackend",
      "createEmployee",
      "alphabetToggle",
      "saveInArchive",
      "alphabetSortStart",
      "alphabetSortEnd",
      "createNextId",
      "setMessage",
      "delEmployee"
    ]),

    // для форматирование данных с сервера и их сортировка  (нужно в Page)
    async dataToStore() {
      try {
        if (this.getEmptyStore("employees")) {
          await this.dataGetBackend("employees", "getBasicUrl");
        }
        this.employees = this.formatStoreData("employees");

        this.message = this.setMessage("employees");
      } catch (error) {
        this.message = `Ошибка  ${error}`;
      }
    },

    // для  кол-ва именинников на сегодняшнюю дату (PageBar стр. 12)
    getTodayBirthday() {
      let todayDate = this.giveTodayDate();
      return this.amountBirthdays = ([...this.getAllEmployeesArray("employees")].filter(
        (elem) => elem["birthday"] === todayDate).length);
    },

    // для проверки работы спиннера без сервера
    resetColorMarks(event) {
      setTimeout(() => {
        this.isReset = true;
        this.isMarked = event.mark;
      }, 4444);
    },

    // для сортировки данных по категории (PageMainHeader)
    onFilterBasicData(event) {
      this.employees = event.category && event.value
        ? this.employees.filter((elem) => elem[event.category].toLowerCase() === event.value)
        : this.employees;

      this.message = this.setMessage("employees");
      this.filteredEmployees = this.employees;
    },

    // для алфавитной сортировки данных
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

    // переключение сортировки от А-Я  в  Я-А
    onAlphabetSort() {
      this.isAlphabet = this.alphabetToggle();
      this.sortingAlphabet(this.employees);
    },

    // сброс фильтра по категории
    onResetFilter() {
      this.filteredEmployees = [];
      this.employees = this.sortingAlphabet([...this.getAllEmployeesArray("employees")]);
    },

    // удаление сотрудника без переноса его в архив
    async onDeleteInBasic(event) {
      // this.saveInArchive(event.id); // ПОКА НЕТ АРХИВА
      this.delEmployee(event.id);

      this.filteredEmployees.length
        ? this.filteredEmployees.splice(
          this.filteredEmployees.indexOf(
            this.employees.find(elem => elem.id === event.id)), 1)

        : this.employees = this.employees.filter(elem => elem.id !== event.id);

      this.message = "";

      // отправляю на сервер
      await this.dataPutBackend("employees", "putBasicUrl");

      // обновляю с сервера в сторе
      await this.dataGetBackend("employees", "getBasicUrl");

      // забираю массив сотрудников из стора (state) в алфавитном порядке
      this.employees = this.formatStoreData("employees");
    },

    // создание нового сотрудника
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
