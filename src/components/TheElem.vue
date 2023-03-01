<script setup>
import { RouterLink } from "vue-router";
import { vMaska } from "maska";

import IconDelete from "./icons/IconDelete.vue";
import IconFullinfo from "./icons/IconFullinfo.vue";
import ThePopup from "./ThePopup.vue";
</script>

<template>
  <template class="employee">
    <img
      class="employee__photo"
      :class="{ employee__status: !employee.hide }"
      :alt="`id: ${employee.id}`"
      :src="employee.src"
      width="35"
      heugth="35"
    />

    <span class="employee__item">
      {{ employee.cn }}
    </span>

    <span class="employee__item employee__item-email">{{
      employee.email
    }}</span>

    <input
      class="input-maska input-maska__min"
      type="text"
      aria-label="phone"
      v-model="employee.telephone"
      v-maska
      data-maska="##-##"
      tabindex="-1"
      readonly
    />

    <input
      class="input-maska"
      type="text"
      aria-label="mobile"
      v-model="employee.mobile"
      v-maska
      data-maska="### ###-##-##"
      tabindex="-1"
      readonly
    />

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
  </template>
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
  grid-template-columns: auto minmax(auto, 35%) 21% repeat(4, auto);
  gap: 15px;

  align-items: center;
  list-style: none;
  border-radius: 8px;
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  background-color: var(--vt-c-white-mute);
  padding: 10px;
  margin-bottom: 10px;
}

.employee:last-child {
  margin: 0;
}

.input-maska {
  width: 100px;
  background: inherit;
  box-shadow: none;
  font-size: inherit;
  font-style: normal;
  outline: none;
  padding: 0;
  margin: 0;
}

.input-maska__min {
  width: 50px;
}

.employee__photo {
  width: 35px;
  height: 35px;
  background-color: var(--vt-c-white-background);
  border: 2px solid var(--vt-c-active-2);
  border-radius: 14%;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-6);
  margin: 0;
}

.employee__item {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media screen and (max-width: 800px) {
  .employee {
    grid-template-columns: repeat (6, auto);
    grid-template-columns: 45% repeat(4, auto);
  }

  .employee__item-email,
  .employee__photo {
    display: none;
  }
}
</style>
