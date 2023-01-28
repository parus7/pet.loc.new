<script setup>
import TheHeader from "../../components/TheHeader.vue";
import TheElem from "../../components/TheElem.vue";
import employeesData from "../../data/employeesData.json";

import { useEmplStore } from "../../stores/EmplStore";
import { mapState, mapActions } from "pinia";
</script>

<template>
  <TheHeader />
  <!-- @alphabet="onAlphabetSort"
    @filterEmpl="onFilterData($event)" -->

  <template v-if="!getEmptyStore">
    <TheElem
      v-for="employee in employees.values()"
      :key="employee.id"
      :employee="employee"
      @delEmpl="onDelete(employee.id)"
    />
  </template>

  <template v-else>
    <h2 class="message">Список сотрудников пуст</h2>
  </template>
</template>

<script>
export default {
  components: { TheHeader, TheElem },

  data() {
    return {
      employees: {},
    };
  },

  created() {
    this.employees = this.setMapEmployees(employeesData);
    // console.log(this.employees);
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore"]),
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setMapEmployees",
      "getFilterData",
      "getAlphabetSort",
      "delEmployee",
    ]),

    onDelete(id) {
      this.employees = this.delEmployee(id);
      // console.log(this.employees);
    },
  },
};
</script>

<style scoped>
.message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
