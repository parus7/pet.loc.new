<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapState } from "pinia";

import { RouterLink } from "vue-router";
import IconDelete from "./IconDelete.vue";
import IconFullinfo from "./IconFullinfo.vue";

const { employees } = useEmplStore();

const props = defineProps({
  employee: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<template>
  <ul class="container_employee">
    <!--Если hide === true то не показывать сотрудника. -->
    <li class="photo" :class="{ employee_status: !employee.hide }"></li>

    <li class="full_name">
      {{ employee.cn }}
    </li>

    <li class="position">{{ employee.title }}</li>
    <li class="email">{{ employee.email }}</li>
    <li class="phone">{{ getEmplTelephone(employee.id) }}</li>
    <li class="mobile">{{ getEmplMobile(employee.id) }}</li>

    <li>
      <RouterLink
        :to="{
          name: 'card',
          params: { id: employee.id },
        }"
      >
        <button type="button" class="button-icon">
          <IconFullinfo />
        </button>
      </RouterLink>
    </li>

    <li>
      <button
        type="button"
        class="button-icon"
        @click="this.$emit('delEmpl', employee.id)"
      >
        <IconDelete />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    ...mapState(useEmplStore, ["getEmplTelephone", "getEmplMobile"]),
  },
};
</script>

<style scoped>
.container_employee {
  display: grid;
  grid-template-columns: 5% 20% 16% 17% auto auto 5% 5%;
  grid-gap: 2%;
  max-width: 100%;
  line-height: 1.6;
  align-items: center;
  list-style: none;
  border-radius: 8px;
  background-color: var(--vt-c-white-mute);
  padding: 10px;
}
.photo {
  width: 35px;
  height: 35px;
  background-color: var(--vt-c-grey-light);
  border-radius: 10%;
  margin: 0;
}
.full_name,
.position,
.email {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.employee_status {
  border: 2px solid var(--vt-c-active-btn);
}
</style>
