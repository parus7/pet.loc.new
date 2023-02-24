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
    <form class="header__form" @submit.prevent>
      <div class="hint" data-name="создать сотрудника">
        <button
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
        @ok="onCreateEmployee"
      >
        Вы хотите создать нового сотрудника?
      </ThePopup>
      <div class="container__button header__button-icon relative">
        <button
          type="button"
          class="button-icon"
          aria-label="алфавитная сортировка"
          @click="setAlphabetSort"
        >
          <div class="hint relative" data-name="алфавитная сортировка">
            <IconAlphabet />
          </div>
        </button>

        <select
          id="filter"
          class="header__form-search"
          aria-label="поле выбора категории для поиска"
          v-model="selected"
          @change="onChangeSelect"
        >
          <option value="" disabled>Выберите категорию</option>
          <option v-for="category in categories" :key="category.text">
            {{ category.text }}
          </option>
        </select>

        <input
          id="search"
          type="text"
          class="header__form-search"
          aria-label="поле поиска"
          placeholder="Поиск..."
          v-maska="onMasked"
          v-model="inputValue"
          :data-maska="myMask"
        />

        <button
          type="button"
          class="header__form-btn"
          aria-label="поиск"
          @click="onSendButtonClick"
        >
          <IconSearch />
        </button>

        <button
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
  directives: { maska: vMaska },

  data() {
    return {
      isOpen: false,
      selected: "",
      inputValue: null,

      onMasked: {
        masked: "",
        unmasked: "",
        completed: false,
      },

      category: {},
      myMask: "",

      categories: [
        { text: "идентификационный номер", item: "id" },
        { text: "пол", item: "gender" },
        { text: "имя", item: "first_name" },
        { text: "фамилия", item: "last_name" },
        { text: "отчество", item: "middle_name" },
        { text: "день рождения", item: "birthday" },
        { text: "внутренний телефон", item: "telephone" },
        { text: "мобильный телефон", item: "mobile" },
        { text: "должность", item: "title" },
        { text: "отдел", item: "department" },
        { text: "компания", item: "company" },
        { text: "город", item: "city" },
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
        this.inputValue.slice(0, 1).toUpperCase() + this.inputValue.slice(1);

      this.$emit("emplFilter", {
        param: this.category.item,
        value: this.inputValue,
        // value: this.onMasked.unmasked,
      });

      // console.log({
      //   param: this.category.item,
      //   value: this.onMasked.unmasked,
      // });

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

  height: 6vh;
  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 20px;
}

.header__form {
  display: flex;
  justify-content: space-between;
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
  right: 57px;

  width: 55px;
  height: 32px;
  background-color: var(--vt-c-active-9);
  outline-color: var(--vt-c-outline);
  border: none;
  border-radius: 0 9px 9px 0;
  opacity: 0.6;
}

.header__button-icon {
  margin-left: 20px;
}

@media (max-width: 767px) {
  .header__form-btn {
    right: 67px;
  }
}
</style>
