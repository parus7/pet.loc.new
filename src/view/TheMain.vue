<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheBar from "../components/TheBar.vue";
import TheList from "../components/TheList.vue";
import ThePagination from "../components/ThePagination.vue";

import { useEmplStore } from "../stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesData from "../data/employeesData.json";
</script>

<template>
  <div class="main">
    <TheHeader
      class="main_header"
      @alphabetFilter="onAlphabet($event)"
      @emplFilter="filterData($event)"
      @emplCreate="onCreateEmployee()"
    >
    </TheHeader>
    <TheBar class="main_bar" />

    <!-- {{ message }} -->
    {{ isAlphabet }}

    <TheList
      class="main_list"
      :employees="{ ...employees }"
      :message="message"
      @deleteEmoployee="onDeletete($event)"
    />
    <ThePagination class="main_pagination" :totalPage="totalPage" />
  </div>
</template>

<script>
export default {
  components: { TheHeader, TheList, TheBar, ThePagination },

  data() {
    return {
      employees: {},
      isAlphabet: null,

      message: "",
      length: null,

      limitPage: 13,
      totalPage: 0,
    };
  },

  created() {
    this.employees = this.getEmptyStore
      ? this.setMapEmployees(employeesData).values()
      : this.getAllEmployees;

    this.totalPage = Math.ceil(this.getAllEmployees.length / this.limitPage);
    this.isAlphabet = this.getAlphabet;

    this.onAlphabet();
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployees",
      "delEmployee",
      "getAlphabet",
    ]),
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "onFilterData",
      "createEmployee",
    ]),

    filterData(event) {
      this.onAlphabetToggle();

      this.employees = [...this.getAllEmployees].filter(
        (elem) => elem[event.param] == event.value
      );

      // console.log(Array.isArray(this.employees));
      // console.log(this.employees.length);

      this.message =
        this.employees.length === 0
          ? "Нет сотрудников, соответствующих вашему поиску"
          : "";

      // console.log(this.message);
    },

    onAlphabet() {
      this.employees =
        this.isAlphabet === false
          ? [...this.getAllEmployees].sort((a, b) => a.cn.localeCompare(b.cn))
          : [...this.getAllEmployees].sort((a, b) => b.cn.localeCompare(a.cn));

      this.onAlphabetToggle();
      return this.employees;
    },

    onAlphabetToggle() {
      this.isAlphabet = !this.isAlphabet;
    },

    onDeletete(event) {
      this.onAlphabetToggle();

      this.delEmployee(event.id);
      this.employees = [...this.getAllEmployees];

      this.message =
        this.employees.length === 0 ? "Список сотрудников пуст" : "";

      this.onAlphabet();
    },

    onCreateEmployee() {
      this.onAlphabetToggle();
      this.createEmployee();

      this.onAlphabet();

      // console.log(this.isAlphabet);
    },
  },
};
</script>

<style scope>
.main {
  display: grid;
  gap: 10px;
  grid-template-columns: min-content 1fr;
  padding: 17px;
  margin: 0 auto;
}

.main_header,
.main_pagination {
  grid-column: 1/-1;
}

.main_bar {
  grid-column: 1/2;
  grid-row: 2/4;
}

.main_list {
  grid-column: 2/3;
  /* margin: 0; */
}

@media screen and (max-width: 991px) {
  .main_bar,
  .main_list {
    grid-column: 1/-1;
  }

  .main_bar {
    grid-row: 2/3;
  }
}

@media screen and (max-width: 767px) {
  .main_pagination {
    display: none;
  }
}
</style>
