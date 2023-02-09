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
    <TheHeader @filterEmpl="filterData($event)" @resetFilters="onResetFilters">
    </TheHeader>
    <TheBar />
    <TheList :employees="employees" />
  </template>
</template>

<script>
export default {
  components: { TheHeader, TheList, TheBar },

  data() {
    return {
      employees: {},
      initialEmployees: {},
    };
  },

  created() {
    this.employees = this.getEmptyStore
      ? this.setMapEmployees(employeesData)
      : this.getAllEmployees;
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployees"]),
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees", "onFilterData"]),

    filterData(event) {
      this.employees = [...this.employees.values()].filter(
        (elem) => elem[event.param] == event.value
      );
      console.log(this.employees);
    },

    onResetFilters() {
      this.employees = this.getAllEmployees;
    },
  },
};
</script>

<style scope>
.main {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 60px 1fr;
  gap: 10px;
  padding: 20px;
}
</style>
