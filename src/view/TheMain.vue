<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheBar from "../components/TheBar.vue";
import TheList from "../components/TheList.vue";

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
      @deleteEmoployee="onDeletete($event)"
    />
  </div>
</template>

<script>
export default {
  components: { TheHeader, TheList, TheBar },

  data() {
    return {
      employees: {},
      isAlphabet: true,
      message: "",
      length: null,
    };
  },

  created() {
    this.employees = this.getEmptyStore
      ? this.setMapEmployees(employeesData).values()
      : this.getAllEmployees;
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

      console.log(Array.isArray(this.employees));

      this.message =
        this.employees.length === 0
          ? "Нет сотрудников, соответствующих вашему поиску"
          : "";

      console.log(this.employees.length);
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
      console.log(this.employees);
      console.log(Array.isArray(this.employees)); //true

      this.message =
        this.employees.length === 0 ? "Список сотрудников пуст" : "";

      console.log(this.employees);
    },
  },
};
</script>

<style scope>
.main {
  display: grid;
  grid-column: 2 / 3;
  grid-template-columns: 55px 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 10px;

  max-width: 1024px;
  padding: 25px;
  margin: 0 auto;
}
</style>
