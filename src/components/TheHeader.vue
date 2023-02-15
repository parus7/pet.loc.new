<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapActions } from "pinia";

import IconAdd from "./icons/IconAdd.vue";
import IconAlphabet from "./icons/IconAlphabet.vue";
import IconSearch from "./icons/IconSearch.vue";
import IconReset from "./icons/IconReset.vue";

import ThePopup from "./ThePopup.vue";
</script>

<template>
  <div class="header">
    <form class="header__form" @submit.prevent>
      <div class="hint" data-name="создать сотрудника">
        <button
          name="create"
          type="button"
          class="button"
          aria-label="создать сотрудника"
          @click="isOpen = true"
        >
          <IconAdd />
        </button>
      </div>

      <ThePopup
        :is-open="isOpen"
        @close="isOpen = false"
        @ok="onCreateEmployee()"
      >
        Вы хотите создать нового сотрудника?
      </ThePopup>
      <div class="container__button header__button-icon relative">
        <button
          name="alphabet"
          type="button"
          class="button-icon"
          aria-label="алфавитная сортировка"
          @click="setAlphabetSort()"
        >
          <div class="hint relative" data-name="алфавитная сортировка">
            <IconAlphabet />
          </div>
        </button>

        <select
          id="filter"
          class="header__form-search"
          name="filter"
          aria-label="поле выбора категории для поиска"
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
          class="header__form-search"
          name="search"
          aria-label="поле поиска"
          placeholder="Поиск..."
          v-model="inputValue"
        />
        <button
          type="button"
          class="header__form-btn"
          aria-label="поиск"
          @click="onConvertSelected"
        >
          <IconSearch />
        </button>

        <button
          name="reset"
          type="button"
          class="button-icon header__button-icon reset"
          aria-label="сброс фильтров"
          @click="resetFilters"
        >
          <div class="hint relative" data-name="сброс фильтров">
            <IconReset />
          </div>
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

      this.$emit("emplFilter", {
        param: this.category.item,
        value: this.inputValue,
      });

      this.selected = "";
      this.inputValue = "";
    },

    setAlphabetSort() {
      this.$emit("alphabetFilter");
    },

    resetFilters() {
      this.$emit("resetFilters");
    },
  },
};
</script>

<style scoped>
.header {
  grid-column: 1 / 3;
  grid-row: 1 / 2;

  background-color: var(--vt-c-white-mute);
  border-radius: 8px;
  padding: 25px 20px;
}

.header__form {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10;
}
.header__button-icon {
  max-width: 95%;
}

.header__form-search {
  width: 210px;
  text-overflow: ellipsis;
  padding: 5px 60px 5px 15px;
}

.header__form-btn {
  position: absolute;
  top: 0;
  right: 34px;

  width: 55px;
  height: 28px;
  background-color: var(--vt-c-active-cloudy-btn);
  outline-color: var(--vt-c-outline);
  border: none;
  border-radius: 0 9px 9px 0;
  opacity: 0.6;
}

.header__button-icon {
  margin-left: 10px;
}

@media (max-width: 767px) {
  .header__form-btn {
    right: 57px;
  }
}
</style>
