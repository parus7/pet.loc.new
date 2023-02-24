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
      @emplFilter="filterData($event)"
      @resetFilters="onResetFilters"
      @alphabetFilter="onAlphabetToggle"
    >
    </TheHeader>
    <TheBar />
    <TheList
      :employees="employees"
      :message="message"
      :length="length"
      :numberPage="numberPage"
      :totalPage="totalPage"
      @deleteEmoployee="onDeletete($event)"
    />
    <ThePagination />
  </div>
</template>

<script>
export default {
  components: { TheHeader, TheList, TheBar, ThePagination },

  data() {
    return {
      employees: {},
      isAlphabet: true,

      message: "",
      length: null,

      numberPage: 17,
      limit: 13,
      totalPage: 0,
    };
  },

  created() {
    this.employees = this.getEmptyStore
      ? this.setMapEmployees(employeesData).values()
      : this.getAllEmployees;

    this.totalPage = Math.ceil(this.numberPage / this.limit);
    console.log(this.numberPage);
    console.log(this.totalPage);
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployees",
      "delEmployee",
    ]),
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees", "onFilterData"]),

    filterData(event) {
      this.employees = [...this.employees].filter(
        (elem) => elem[event.param] == event.value
      );

      this.message =
        this.employees.length === 0
          ? "Нет сотрудников, соответствующих вашему поиску"
          : "";
    },

    onResetFilters() {
      this.employees = this.getAllEmployees;
    },

    onAlphabetToggle() {
      this.isAlphabet = !this.isAlphabet;

      this.employees =
        this.isAlphabet === true
          ? [...this.getAllEmployees].sort((a, b) => b.cn.localeCompare(a.cn))
          : [...this.getAllEmployees].sort((a, b) => a.cn.localeCompare(b.cn));
    },

    onDeletete(id) {
      this.delEmployee(id);
      this.employees = this.getAllEmployees;

      this.message =
        this.employees.length === 0 ? "Список сотрудников пуст" : "";
    },
  },
};
</script>

<style scope>
.main {
  display: grid;
  grid-column: 2 / 3;
  grid-template-columns: 55px 1fr;
  grid-template-rows: auto auto 1fr auto;
  gap: 15px;

  max-width: 1024px;

  height: 60vh;
  padding: 25px;
  margin: 0 auto;
}
</style>
