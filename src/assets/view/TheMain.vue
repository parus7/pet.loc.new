<script setup>
import TheHeader from "../../components/TheHeader.vue";
import TheElem from "../../components/TheElem.vue";

import { useEmplStore } from "../../stores/EmplStore";
import { mapState, mapActions } from "pinia";
</script>

<template>
  <TheHeader @filterEmpl="onFilterData($event)" />

  <template v-if="!getEmptyStore">
    <TheElem
      v-for="employee of employeesFilter"
      :key="employee.id"
      :employee="employee"
      @delEmpl="delEmployee(employee.id)"
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
    this.employees = { ...this.getAllEmployees };
    this.employeesFilter = { ...this.employees };
  },

  data() {
    return {
      employees: [],
      employeesFilter: [],
    };
  },

  computed: {
    ...mapState(useEmplStore, [
      "getEmptyStore",
      "getAllEmployees",
      "getEmplTelephone",
      "getEmplMobile",
    ]),
  },

  methods: {
    ...mapActions(useEmplStore, ["delEmployee", "getFilterData"]),

    onFilterData(event) {
      this.employeesFilter = this.getFilterData(event);
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
