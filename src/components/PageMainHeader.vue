<template>
  <div class="header">
    <div class="help relative" data-name="создать&nbsp;карточку">
      <PageButton
        class="header__button-create relative"
        aria-label="создать сотрудника"
        @click="isOpen = true"
      >
        <IconAdd />
      </PageButton>
    </div>

    <PagePopup
      :is-open="isOpen"
      @close="isOpen = false"
      @ok="onCreateEmployee($event)"
    >
      Вы хотите создать нового сотрудника?
    </PagePopup>

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

      <div class="relative header__wrapper">
        <input
          id="search"
          type="text"
          class="header__form-search"
          aria-label="поле поиска"
          placeholder="Поиск..."
          v-model="inputValue"
          v-maska="mask"
          :data-maska="myMask"
          @keyup.enter="onSendButtonClick"
        />

        <PageButton
          class="header__form-btn"
          aria-label="поиск"
          @click="onSendButtonClick"
        >
          <IconSearch />
        </PageButton>
      </div>
    </form>

    <span
      class="help relative"
      data-name="по&nbsp;алфавиту&nbsp;или сброс фильтра"
    >
      <PageButton
        class="header__button-alphabet"
        aria-label="алфавитная сортировка  и сброс фильтра поиска"
        @click="setAlphabetSort"
      >

        <IconAlphabet />
      </PageButton>
    </span>
  </div>
</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapActions } from "pinia";

import IconAdd from "@/components/icons/IconAdd.vue";
import IconAlphabet from "@/components/icons/IconAlphabet.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

import PagePopup from "@/components/PagePopup.vue";
import PageButton from "@/components/UI/PageButton.vue";
import { vMaska } from "maska";

export default {
  components: { IconSearch, IconAlphabet, IconAdd, PagePopup, PageButton },
  directives: { maska: vMaska },

  data() {
    return {
      isOpen: false,
      selected: "",
      inputValue: null,
      isAlphabet: null,

      mask: {
        masked: "",
        unmasked: "",
        completed: false
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
        { text: "город", item: "city" }
      ]
    };
  },

  methods: {
    ...mapActions(useEmplStore, [
      "createEmployee",
      "createNextId",
      "alphabetToggle"
    ]),

    onCreateEmployee() {
      this.isAlphabet = this.alphabetToggle();
      const id = this.createNextId();

      this.$router.push({
        name: "newCard",
        params: { id: id }
      });

      this.isOpen = false;
      this.$emit("employeeCreate", { id: id });
    },

    onChangeSelect() {
      this.category = this.categories.find(
        (elem) => elem.text === this.selected
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
          : this.mask.unmasked;

      this.$emit("employeeFilter", {
        param: this.category.item,
        value: this.inputValue
      });

      this.selected = "";
      this.inputValue = "";
    },

    setAlphabetSort() {
      this.$emit("alphabetFilter");
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  gap: 20px;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 10px;
}

.header__form {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.header__form-select,
.header__form-search {
  box-shadow: 4px 4px 4px 1px var(--vt-c-active-2);
  padding: 7px 40px 7px 15px;
}

.header__form-btn {
  position: absolute;
  top: 0;
  right: 0;

  background-color: inherit;
  box-shadow: none;
  padding: 4px;
}

.header__wrapper {
  display: grid;
}

@media screen and (max-width: 729px) {
  .header__form {
    flex-direction: column;
    flex-grow: 1;
    gap: 10px;
  }
}

@media screen and (max-width: 499px) {
  .header {
    flex-direction: column;
  }

  .header__button-create,
  .header__button-alphabet {
    flex-grow: 1;
  }

  .header__form {
    gap: 20px;
  }
}
</style>
