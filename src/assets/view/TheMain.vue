<script setup>
import TheHeader from "../../components/TheHeader.vue";
import TheElem from "../../components/TheElem.vue";
import employeesData from "../../data/employeesData.json";

import { useEmplStore } from "../../stores/EmplStore";
import { mapState, mapActions } from "pinia";
// const { employees } = useEmplStore();
</script>

<template>
  <TheHeader
    @filterEmpl="onFilterData($event)"
    @alphabetSort="onAlphabetSort"
  />

  <template v-if="!getEmptyStore">
    <TheElem
      v-for="employee of employees"
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

  created() {
    this.employees = this.setObj(employeesData);
    this.employees = this.getAllEmployees;
    // console.log(this.employees);
  },

  data() {
    return {
      employees: [],
    };
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployees"]),
  },

  methods: {
    ...mapActions(useEmplStore, [
      "setObj",
      "getFilterData",
      "getAlphabetSort",
      "delEmployee",
    ]),

    onDelete(id) {
      this.employees = this.delEmployee(id);
      // console.log(this.employees); //ок
    },

    onFilterData(event) {
      this.employees = this.getFilterData(event);
      // console.log(this.employees); //ок
    },

    onAlphabetSort() {
      this.employees = this.getAlphabetSort();
      // console.log(this.employees); //ок
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
