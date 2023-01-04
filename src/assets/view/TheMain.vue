<script setup>
import TheHeader from "../../components/TheHeader.vue";
import TheElem from "../../components/TheElem.vue";
import { useEmplStore } from "../../stores/EmplStore";
import { mapState } from "pinia";

const employeesData = useEmplStore();
</script>

<template>
  <TheHeader />
  <template v-if="!getEmptyStore">
    <TheElem
      v-for="employee of employeesData.employees"
      :key="employee.id"
      :employee="employee"
      @delEmpl="employeesData.deleteEmpl(employee.id)"
    />
  </template>

  <template v-else>
    <h2 class="message">Список сотрудников пуст</h2>
  </template>
</template>

<script>
export default {
  components: { TheHeader, TheElem },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore"]),
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
