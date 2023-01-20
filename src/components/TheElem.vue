<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapState, mapActions } from "pinia";

import { RouterLink } from "vue-router";
import IconDelete from "./IconDelete.vue";
import IconFullinfo from "./IconFullinfo.vue";
import ThePopup from "./ThePopup.vue";

const { employees } = useEmplStore();
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
      <button type="button" class="button-icon" @click="isOpen = true">
        <IconDelete />
      </button>

      <ThePopup :is-open="isOpen" @ok="popupDelete" @close="isOpen = false"
        >Вы хотите удалить сотрудника?
      </ThePopup>
    </li>
  </ul>
</template>

<script>
export default {
  components: { IconDelete, IconFullinfo, ThePopup },

  props: {
    employee: {
      id: Number,
      name: String,
      hide: Boolean,
      thumbnail: Boolean,
      gender: String,
      first_name: String,
      last_name: String,
      middle_name: String,
      birthday: String,
      email: String,
      cn: String,
      telephone: String,
      mobile: String,
      title: String,
      department: String,
      company: String,
      city: String,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    ...mapState(useEmplStore, ["getEmplTelephone", "getEmplMobile"]),
    ...mapActions(useEmplStore, ["popupConfirm"]),
  },

  methods: {
    popupDelete() {
      this.$emit("delEmpl", this.employee.id);
    },
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
  background-color: var(--vt-c-white-background);
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
  opacity: 0.7;
}
</style>
