<script setup>
import TheHeader from "../../components/TheHeader.vue";
import TheList from "../../components/TheList.vue";
import TheBar from "../../components/TheBar.vue";

import { useEmplStore } from "../../stores/EmplStore";
import { mapState, mapActions } from "pinia";
import employeesData from "../../data/employeesData.json";
</script>

<template>
  <template class="main">
    <TheHeader
      @filterEmpl="filterData($event)"
      @resetFilters="onResetFilters()"
      @up="alphabetUp()"
      @down="alphabetDown()"
    >
    </TheHeader>
    <TheBar />
    <TheList
      :employees="getEmployees().values()"
      @deleteEmoployee="onDeletete($event)"
    />
  </template>
</template>

<script>
export default {
  components: { TheHeader, TheList, TheBar },

  data() {
    return {
      employees: {},
      sortType: "null",
    };
  },

  created() {
    this.employees = this.getEmptyStore
      ? this.setMapEmployees(employeesData)
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
      this.employees = [...this.employees.values()].filter(
        (elem) => elem[event.param] == event.value
      );
      // console.log(this.employees);
    },

    onResetFilters() {
      this.employees = this.getAllEmployees;
    },

    // А-Я
    alphabetDown() {
      this.sortType = "down";
      this.employees = [...this.getAllEmployees.values()].sort((a, b) =>
        a.cn.localeCompare(b.cn)
      );
      // console.log(this.employees, "alphabetDown");
    },

    // Я-А
    alphabetUp() {
      this.sortType = "up";
      this.employees = [...this.getAllEmployees.values()].sort((a, b) =>
        b.cn.localeCompare(a.cn)
      );
      // console.log(this.employees, "alphabetUp");
    },

    getEmployees() {
      return this.employees;
    },

    onDeletete(id) {
      this.delEmployee(id);
      switch (this.sortType) {
        case "down":
          this.alphabetDown();
          break;
        case "up":
          this.alphabetUp();
          break;
        default:
          this.employees = this.getAllEmployees;
      }
    },
  },
};
</script>

<style scope>
.main {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 65px 1fr;
  gap: 10px;

  padding: 25px;
  margin: auto;
}
</style>
