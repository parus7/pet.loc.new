<template>
  <div class="list">
    <template v-if="employees.length > 0">
      <transition-group name="list">
        <PageElem
          v-for="employee in employees"
          :key="employee.id"
          :employee="{ ...employee }"
          @deleteEmployee="$emit('deleteEmployee', { id: employee.id })"
        />
      </transition-group>
    </template>

    <template v-else>
      <h2 class="list__message">{{ message }}</h2>
    </template>
  </div>
</template>

<script>
import PageElem from "../components/PageElem.vue";

export default {
  components: { PageElem },

  props: {
    employees: Object,
    message: String
  }
};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.list__message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
