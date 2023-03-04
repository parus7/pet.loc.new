<script setup>
import TheElem from "../components/TheElem.vue";
</script>

<template>
  <div class="list">
    <template v-if="employees.length !== 0">
      <TheElem
        v-for="employee in employees"
        :key="employee.id"
        :employee="{ ...employee }"
        @delEmpl="$emit('deleteEmoployee', employee.id)"
      />
    </template>

    <template v-else>
      <h2 class="list__message">{{ message }}</h2>
    </template>
  </div>
</template>

<script>
export default {
  components: { TheElem },
  props: {
    employees: Object,
    message: String,
  },
};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;

  padding: 0;
  margin: 0;
}
.list__message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
