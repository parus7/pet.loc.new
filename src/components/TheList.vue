<script setup>
import TheElem from "../components/TheElem.vue";
</script>

<template>
  <div class="list">
    <template v-if="employees">
      <TheElem
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee"
        @delEmpl="$emit('deleteEmoployee', employee.id)"
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
@media  (max-width: 767px) {
  .list {
    grid-column: 1 / 3;
     grid-row: 3 / 4;
  }
}
</style>
