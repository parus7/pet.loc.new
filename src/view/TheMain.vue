<script setup>
import TheHeader from "../components/TheHeader.vue";
import TheList from "../components/TheList.vue";
import TheBar from "../components/TheBar.vue";

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
      :employees="getEmployees().values()"
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
    },

    onResetFilters() {
      this.employees = this.getAllEmployees;
    },

    onAlphabetToggle() {
      this.isAlphabet = !this.isAlphabet;

      this.employees =
        this.isAlphabet === true
          ? [...this.getAllEmployees.values()].sort((a, b) =>
              b.cn.localeCompare(a.cn)
            )
          : [...this.getAllEmployees.values()].sort((a, b) =>
              a.cn.localeCompare(b.cn)
            );
    },

    onDeletete(id) {
      this.delEmployee(id);
      this.employees = this.getAllEmployees;
    },

    getEmployees() {
      return this.employees;
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
