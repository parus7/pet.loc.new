<script setup>
import TheHeader from "../../components/TheHeader.vue";
import TheElem from "../../components/TheElem.vue";

import { useEmplStore } from "../../stores/EmplStore";
const employeesData = useEmplStore();
</script>

<template>
  <TheHeader />
  <TheElem
    v-for="employee of employeesData.employees"
    :key="employee.id"
    :employee="employee"
    @delEmpl="employeesData.deleteEmpl(employee.id)"
  />

  <h2 class="message"></h2>
</template>

<script>
export default {
  components: { TheHeader, TheElem },
};
</script>

<style scoped>
.message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
