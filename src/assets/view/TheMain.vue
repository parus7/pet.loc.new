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
      v-for="(employee, key) in emplValues"
      :key="key"
      :employee="employee"
      @delEmpl="delEmployee(employee.id)"
    />
  </template>

  <template v-else>
    {{ emplValues }}
    <h2 class="message">Список сотрудников пуст</h2>
  </template>
</template>

<script>
export default {
  components: { TheHeader, TheElem },

  data() {
    return {
      employees: {},
      emplValues: {},
    };
  },

  created() {
    this.employees = this.setMapEmployees(employeesData);
    this.emplValues = this.employees.values();
    // console.log(this.employees);// ok
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

    // onDelete(id) {
    //   // const id = this.employees.get(key);
    //   this.emplValues = this.delEmployee(id);
    //   // console.log(this.emplValues);
    // },
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
