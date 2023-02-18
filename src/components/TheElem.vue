<script setup>
import { RouterLink } from "vue-router";

import IconDelete from "./icons/IconDelete.vue";
import IconFullinfo from "./icons/IconFullinfo.vue";
import ThePopup from "./ThePopup.vue";
</script>

<template>
  <ul class="employee">
    <li>
      <img
        class="employee__photo"
        :class="{ employee__status: !employee.hide }"
        :alt="`id: ${employee.id}`"
        :src="employee.src"
        width="35"
        heugth="35"
      />
    </li>

    <li class="employee__item">
      {{ employee.cn }}
    </li>

    <li class="employee__item">{{ employee.email }}</li>
    <li>{{ employee.telephone }}</li>
    <li>{{ employee.mobile }}</li>

    <li>
      <RouterLink
        :to="{
          name: 'card',
          params: { id: employee.id },
        }"
        tabindex="-1"
      >
        <button
          type="button"
          class="button-icon"
          aria-label="переход в профиль сотрудника"
        >
          <div class="hint relative" data-name="переход в профиль">
            <IconFullinfo />
          </div>
        </button>
      </RouterLink>
    </li>

    <li>
      <button
        type="button"
        class="button-icon"
        aria-label="удаление сотрудника"
        @click="isOpen = true"
      >
        <div class="hint relative" data-name="удаление сотрудника">
          <IconDelete />
        </div>
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
      id: String,
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
      src: String,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    popupDelete() {
      this.$emit("delEmpl", this.employee.id);
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.employee {
  display: grid;
  grid-template-columns: 7% 30% 20% 10% 14% 6% 6%;
  gap: 10px;

  max-width: 100%;
  line-height: 1.6;
  align-items: center;
  list-style: none;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  background-color: var(--vt-c-white-mute);
  padding: 10px 15px;
  margin: 0 0 10px;
}

.employee:last-child {
  margin: 0;
}

.employee__photo {
  width: 35px;
  height: 35px;
  background-color: var(--vt-c-white-background);
  border: 2px solid var(--vt-c-active-2);
  border-radius: 10%;
  margin: 0;
}

.employee__item {
  width: auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (max-width: 767px) {
  .employee {
    grid-template-columns: 35% 22% 10% 14% 7% 7%;
    padding: 10px 40px;
  }

  .employee__photo {
    display: none;
  }
}
</style>
