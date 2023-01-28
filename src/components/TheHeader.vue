<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapActions } from "pinia";

import IconSearch from "./IconSearch.vue";
import IconAlphabetFilter from "../components/IconAlphabetFilter.vue";

import ThePopup from "./ThePopup.vue";
// const { employees } = useEmplStore();
</script>

<template>
  <div class="container_header">
    <form @submit.prevent>
      <button type="button" class="button" @click="isOpen = true">
        Создать
      </button>

      <ThePopup
        :is-open="isOpen"
        @close="isOpen = false"
        @ok="onCreateEmployee"
      >
        Вы хотите создать нового сотрудника?
      </ThePopup>

      <div class="container-button">
        <button type="submit" class="button-icon">
          <IconAlphabetFilter />
          <!-- @click="alphabet" -->
        </button>

        <select class="search" id="filter" name="filter" v-model="selected">
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in categories" :key="category.id">
            {{ category.text }}
          </option>
        </select>

        <input
          type="text"
          name="search"
          id="search"
          class="search"
          placeholder="Поиск..."
          v-model="inputValue"
        />

        <IconSearch class="btn_search" />
        <!-- @click="transformtData"  -->
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: { ThePopup, IconAlphabetFilter, IconSearch },

  data() {
    return {
      isOpen: false,
      selected: "",
      inputValue: null,

      categories: [
        { id: 0, text: "идентификационный номер", item: "id" },
        { id: 1, text: "пол", item: "gender" },
        { id: 2, text: "имя", item: "first_name" },
        { id: 3, text: "фамилия", item: "last_name" },
        { id: 4, text: "отчество", item: "middle_name" },
        { id: 5, text: "день рождения", item: "birthday" },
        { id: 6, text: "внутренний телефон", item: "telephone" },
        { id: 7, text: "мобильный телефон", item: "mobile" },
        { id: 8, text: "должность", item: "title" },
        { id: 9, text: "отдел", item: "department" },
        { id: 10, text: "компания", item: "company" },
        { id: 11, text: "город", item: "city" },
      ],
    };
  },

  methods: {
    ...mapActions(useEmplStore, ["createEmployee"]),

    onCreateEmployee() {
      const id = this.createEmployee();

      this.$router.push({ name: "form", params: { id: id } });
      this.isOpen = false;
    },
  },
};
</script>

<style scoped>
.container_header {
  display: flex;
  flex-wrap: nowrap;
  background-color: var(--vt-c-white-mute);
  border-radius: 8px;
  padding: 20px;
}

form {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.search {
  position: relative;
  width: 260px;
  text-overflow: ellipsis;
  padding: 5px 35px 5px 15px;
}

.active_filter path {
  fill: var(--vt-c-alert-btn);
}

.btn_search {
  position: absolute;
  top: 5px;
  right: 5px;
}
.btn_search:hover path {
  fill: var(--vt-c-grey-font);
}
.btn_search:active path {
  fill: var(--vt-c-active-btn);
}
</style>
