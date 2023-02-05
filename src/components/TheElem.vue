<script setup>
import { RouterLink } from "vue-router";

import IconDelete from "./icons/IconDelete.vue";
import IconFullinfo from "./icons/IconFullinfo.vue";
import ThePopup from "./ThePopup.vue";
</script>

<template>
  <ul class="employee">
    <!--Если hide === true то не показывать сотрудника. -->
    <li
      class="employee__photo"
      :class="{ employee__status: !employee.hide }"
    ></li>

    <li class="employee__item">
      {{ employee.cn }}
    </li>

    <li class="employee__item">{{ employee.title }}</li>
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
          aria-label="кнопка перехода в карточку сотрудника"
        >
          <div class="hint relative" data-name="переход в карточку">
            <IconFullinfo />
          </div>
        </button>
      </RouterLink>
    </li>

    <li>
      <button
        type="button"
        class="button-icon"
        aria-label="кнопка удаления сотрудника"
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
  grid-template-columns: 5% 20% 16% 17% auto auto 5% 5%;
  gap: 2%;

  max-width: 100%;
  line-height: 1.6;
  align-items: center;
  list-style: none;
  border-radius: 8px;
  background-color: var(--vt-c-white-mute);
  padding: 10px;
  margin: 0 0 10px;
}

.employee__photo {
  width: 35px;
  height: 35px;
  background-color: var(--vt-c-white-background);
  border-radius: 10%;
  margin: 0;
}

.employee__item {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.employee__status {
  border: 2px solid var(--vt-c-active-btn);
  opacity: 0.7;
}
</style>
