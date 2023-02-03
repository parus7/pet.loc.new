<script setup>
import TheElem from "../components/TheElem.vue";
import employeesData from "../data/employeesData.json";

import { useEmplStore } from "../stores/EmplStore";
import { mapState, mapActions } from "pinia";
</script>

<template>
  <div class="container_list">
    <template v-if="!getEmptyStore">
      <TheElem
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @delEmpl="onDelete(employee.id)"
      />
    </template>

    <template v-else>
      <h2 class="message">Список сотрудников пуст</h2>
    </template>
  </div>
</template>

<script>
export default {
  components: { TheElem },

  data() {
    return {
      employees: {},
    };
  },

  created() {
    this.employees = this.getEmptyStore
      ? this.setMapEmployees(employeesData)
      : this.getAllEmployees;

    this.onAlphabetSort(this.employees);
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployees"]),
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "getFilterData",
      "delEmployee",
    ]),

    onAlphabetSort() {
      this.employees = [...this.employees.values()].sort((a, b) =>
        a.cn.localeCompare(b.cn)
      );
    },

    onDelete(id) {
      this.employees = this.delEmployee(id);
      this.employees = this.getAllEmployees;
      this.onAlphabetSort(this.employees);
    },

    onFilterData(event) {
      this.employees = [...this.employees.values()].filter(
        (elem) => elem[event.param] == event.value
      );
      this.onAlphabetSort(this.employees);
    },

    onResetFilters() {
      this.employees = this.getAllEmployees;
      this.onAlphabetSort(this.employees);
    },
  },
};
</script>

<style scoped>
.container_list {
  display: flex;
  flex-direction: column;

  grid-column: 2 / 3;
  grid-row: 2 / 3;

  padding: 0;
  margin: 0;
}
.message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
