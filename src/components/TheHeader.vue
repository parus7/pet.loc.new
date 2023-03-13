<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapState, mapActions } from "pinia";
import { vMaska } from "maska";

import IconAdd from "./icons/IconAdd.vue";
import IconAlphabet from "./icons/IconAlphabet.vue";
import IconSearch from "./icons/IconSearch.vue";
import IconReset from "./icons/IconReset.vue";

import ThePopup from "./ThePopup.vue";
import TheButton from "./TheButton.vue";
</script>

<template>
  <div class="header">
    <TheButton
      class="header__button-create relative"
      aria-label="создать сотрудника"
      @click="isOpen = true"
    >
      <div class="help" data-name="создать&nbsp;карточку">
        <IconAdd />
      </div>
    </TheButton>

    <ThePopup
      :is-open="isOpen"
      @close="isOpen = false"
      @ok="onCreateEmployee($event)"
    >
      Вы хотите создать нового сотрудника?
    </ThePopup>


    <form class="header__form" @submit.prevent>
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

      <div class="relative">
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

      <div
        class="help relative"
        data-name="по&nbsp;алфавиту&nbsp;или&nbsp;сброс"
      >
        <TheButton
          class="header__button-alphabet"
          aria-label="алфавитная сортировка  и сброс фильтра поиска"
          @click="setAlphabetSort"
        >
          <IconAlphabet />
        </TheButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: { ThePopup, IconReset, IconSearch, TheButton },
  directives: { maska: vMaska },

  data() {
    return {
      isOpen: false,
      selected: "",
      inputValue: null,

      isAlphabet: null,

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
    ...mapActions(useEmplStore, [
      "createEmployee",
      "createNextId",
      "alphabetToggle",
    ]),

    onCreateEmployee() {
      this.isAlphabet = this.alphabetToggle();

      const id = this.createNextId();
      this.$router.push({
        name: "form",
        params: { id: id },
      });

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
  gap: 15px;
}

.header__form-select,
.header__form-search {
  color: inherit;
  padding: 7px 65px 7px 30px;
}

.header__form-btn {
  position: absolute;
  top: 0;
  right: 0;

  background-color: inherit;
  outline-color: var(--vt-c-outline);
  border: none;
  border-radius: 0 9px 9px 0;
  padding: 2px 18px;
}

@media screen and (max-width: 767px) {
  .header,
  .header__form {
    flex-direction: column;
    gap: 20px;
  }

  .header__form-search {
    width: 100%;
  }

  .header__button-create {
    max-width: 70px;
  }

  .header__button-alphabet {
    position: absolute;
    top: -151px;
    right: 0;
  }
}
</style>
