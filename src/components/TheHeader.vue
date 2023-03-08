<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapActions } from "pinia";
import { vMaska } from "maska";

import IconAdd from "./icons/IconAdd.vue";
import IconAlphabet from "./icons/IconAlphabet.vue";
import IconSearch from "./icons/IconSearch.vue";
import IconReset from "./icons/IconReset.vue";

import ThePopup from "./ThePopup.vue";
</script>

<template>
  <div class="header">
    <span class="hint" data-name="создать сотрудника">
      <button
        type="button"
        class="button"
        aria-label="создать сотрудника"
        @click="isOpen = true"
      >
        <IconAdd />
      </button>
    </span>

    <ThePopup
      :is-open="isOpen"
      @close="isOpen = false"
      @ok="onCreateEmployee($event)"
    >
      Вы хотите создать нового сотрудника?
    </ThePopup>

    <form class="header__form" @submit.prevent>
      <button
        type="button"
        class="button-icon"
        aria-label="алфавитная сортировка"
        @click="setAlphabetSort"
      >
        <span class="hint relative" data-name="алфавитная сортировка">
          <IconAlphabet />
        </span>
      </button>

      <select
        id="filter"
        class="header__form-select"
        aria-label="поле выбора категории для поиска"
        v-model="selected"
        @change="onChangeSelect"
      >
        <option value="" disabled>Выбор категории...</option>
        <option v-for="category in categories" :key="category.text">
          {{ category.text }}
        </option>
      </select>

      <div class="container__button relative">
        <input
          id="search"
          type="text"
          class="header__form-search"
          aria-label="поле поиска"
          placeholder="Поиск..."
          v-model="inputValue"
          v-maska="maskaSearch"
          :data-maska="myMask"
          @keyup.enter="onSendButtonClick"
        />

        <button
          type="button"
          class="header__form-btn"
          aria-label="поиск"
          @click="onSendButtonClick"
        >
          <IconSearch />
        </button>
      </div>

      <!-- <button
        type="button"
        class="button-icon header__button-reset"
        aria-label="сброс фильтров"
        @click="resetFilters"
      >
        <span class="hint relative" data-name="сброс фильтров">
          <IconReset />
        </span>
      </button> -->
    </form>
  </div>
</template>

<script>
export default {
  components: { ThePopup, IconReset, IconSearch },
  directives: { maska: vMaska },

  data() {
    return {
      isOpen: false,
      selected: "",
      inputValue: null,

      maskaSearch: {
        masked: "",
        unmasked: "",
        completed: false,
      },

      category: {},
      myMask: "",

      categories: [
        { text: "id", item: "id" },
        { text: "пол", item: "gender" },
        { text: "имя", item: "first_name" },
        { text: "фамилия", item: "last_name" },
        { text: "отчество", item: "middle_name" },
        { text: "день рождения", item: "birthday" },
        { text: "внутренний тел", item: "telephone" },
        { text: "мобильный тел", item: "mobile" },
        { text: "должность", item: "title" },
        { text: "отдел", item: "department" },
        { text: "компания", item: "company" },
        { text: "город", item: "city" },
      ],
    };
  },

  methods: {
    ...mapActions(useEmplStore, ["createEmployee", "createNextId"]),

    onCreateEmployee() {
      const id = this.createNextId();
      this.$router.push({ name: "form", params: { id: id } });

      this.isOpen = false;

      this.$emit("emplCreate", { id: id });
    },

    onChangeSelect() {
      this.category = this.categories.find(
        (elem) => elem.text == this.selected
      );

      this.myMask =
        this.category.item === "birthday"
          ? "##.##"
          : this.category.item === "telephone"
          ? "##-##"
          : this.category.item === "mobile"
          ? "### ###-##-##"
          : "";
    },

    onSendButtonClick() {
      this.inputValue =
        this.myMask === ""
          ? this.inputValue.slice(0, 1).toUpperCase() + this.inputValue.slice(1)
          : this.maskaSearch.unmasked;

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

    // resetFilters() {
    //   this.$emit("resetFilters");
    // },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 20px;
}

.header__form {
  display: flex;
  gap: 10px;
}

.header__form-search {
  text-overflow: ellipsis;
  padding: 5px 65px 5px 20px;
  margin: 0;
}

.header__form-btn {
  position: absolute;
  top: 0;
  right: 0;

  background-color: var(--vt-c-active-9);
  outline-color: var(--vt-c-outline);
  border: none;
  border-radius: 0 9px 9px 0;
  opacity: 0.6;
  padding: 2px 18px;
}

@media screen and (max-width: 767px) {
  .header__form {
    flex-direction: column;
  }

  .header__form-search,
  .header__form-select {
    padding: 7px 65px 7px 20px;
    margin: 0;
  }

  .header__button-reset {
    position: absolute;
    top: 35px;
    right: 50px;
  }
}
</style>
