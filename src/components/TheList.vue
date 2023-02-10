<script setup>
import TheElem from "../components/TheElem.vue";

import { useEmplStore } from "../stores/EmplStore";
import { mapState, mapActions } from "pinia";
</script>

<template>
  <div class="list">
    <template v-if="!getEmptyStore">
      <TheElem
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @delEmpl="onDelete(employee.id)"
      />
    </template>

    <template v-else>
      <h2 class="list__message">Список сотрудников пуст</h2>
    </template>
  </div>
</template>

<script>
export default {
  components: { TheElem },

  props: {
    employees: Object,
  },

  computed: {
    ...mapState(useEmplStore, ["getEmptyStore", "getAllEmployees"]),
  },

  methods: {
    ...mapActions(useEmplStore, ["delEmployee"]),

    onDelete(id) {
      // console.log(this.employees);
      this.delEmployee(id);
    },
  },
};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;

  grid-column: 2 / 3;
  grid-row: 2 / 3;

  padding: 0;
  margin: 0;
}
.list__message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
