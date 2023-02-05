<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapActions } from "pinia";

import IconSearch from "./icons/IconSearch.vue";
import IconReset from "./icons/IconReset.vue";

import ThePopup from "./ThePopup.vue";
</script>

<template>
  <div class="header">
    <form class="header__form relative" @submit.prevent>
      <button
        type="button"
        class="button"
        aria-label="кнопка создания карточки нового сотрудника"
        @click="isOpen = true"
      >
        Создать
      </button>

      <ThePopup
        :is-open="isOpen"
        @close="isOpen = false"
        @ok="onCreateEmployee"
      >
        Вы хотите создать нового сотрудника?
      </ThePopup>

      <div class="container__button">
        <button
          type="button"
          class="button-icon"
          aria-label="кнопка сброса фильтров"
          @click="resetFilters"
        >
          <div class="hint relative" data-name="сброс фильтров">
            <IconReset />
          </div>
        </button>

        <select
          id="filter"
          class="header__form-search"
          name="filter"
          aria-label="поле выбора категории поиска"
          v-model="selected"
        >
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in categories" :key="category.id">
            {{ category.text }}
          </option>
        </select>

        <input
          id="search"
          type="text"
          class="header__form-search relative"
          name="search"
          aria-label="поле поиска"
          placeholder="Поиск..."
          v-model="inputValue"
        />
        <button
          type="button"
          class="header__form-btn"
          aria-label="кнопка поиска"
          @click="onConvertSelected"
        >
          <IconSearch />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: { ThePopup, IconReset, IconSearch },

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

    onConvertSelected() {
      this.category = this.categories.find(
        (elem) => elem.text == this.selected
      );

      this.inputValue =
        this.inputValue.slice(0, 1).toUpperCase() + this.inputValue.slice(1);

      this.$emit("filterEmpl", {
        param: this.category.item,
        value: this.inputValue,
      });

      this.selected = "";
      this.inputValue = "";
    },

    resetFilters() {
      this.$emit("resetFilters");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-wrap: nowrap;

  grid-column: 1 / 3;
  grid-row: 1 / 2;

  background-color: var(--vt-c-white-mute);
  border-radius: 8px;
  padding: 20px;
}

.header__form {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.header__form-search {
  width: 260px;
  text-overflow: ellipsis;
  padding: 5px 35px 5px 15px;
}

.header__form-btn {
  position: absolute;
  top: 3px;
  right: 5px;
  background-color: inherit;
  border: none;
  outline-color: var(--vt-c-outline);
  padding: 0;
}
.header__form-btn:hover path {
  fill: var(--vt-c-grey-font);
}
.header__form-btn:active path {
  fill: var(--vt-c-active-btn);
}
</style>
