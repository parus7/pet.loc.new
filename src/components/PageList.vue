<template>
  <div class="list">
    <template v-if="employees.length > 0">
      <transition-group name="animation">
        <PageElem
          v-for="employee in employees"
          :key="employee.id"
          :employee="{ ...employee }"
          :isMain="isMain"
          :isMarked="isMarked"
          @deleteEmployee="$emit('deleteEmployee',  $event )"
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
    message: String,
    isMain: Boolean,
    isMarked: Boolean
  }
};
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 99%;
  gap: 10px;
  margin: 0 auto;
}

.list__message {
  color: var(--vt-c-grey-font);
  text-align: center;
  margin: 40px 0;
}
</style>
