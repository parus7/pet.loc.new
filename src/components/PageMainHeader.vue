<template>
  <div class="main-header">
    <form class="main-header__form" @submit.prevent>
      <div class="help relative" data-name="создать&nbsp;карточку">
        <PageButton
          class="main-header__button-create relative"
          aria-label="создать сотрудника"
          @click="isOpen = true"
        >
          <IconAdd />
        </PageButton>

        <PagePopup
          :is-open="isOpen"
          @close="isOpen = false"
          @ok="employeeCreate($event)"
        >
          Вы хотите создать нового сотрудника?
        </PagePopup>
      </div>

      <fieldset class="main-header__fieldset">
        <select
          id="filter"
          class="main-header__form-select"
          aria-label="поле выбора категории для поиска"
          v-model="selected"
          @change="onChangeSelect"
        >

          <option value="" disabled>Выбор категории...</option>
          <option v-for="category in categories" :key="category.text">
            {{ category.text }}
          </option>
        </select>

        <div class="relative main-header__wrapper">
          <input
            id="search"
            type="text"
            class="main-header__form-search"
            aria-label="поле поиска"
            placeholder="Поиск..."
            v-model="inputValue"
            v-maska="mask"
            :data-maska="myMask"
            @keyup.enter="filterEmployee"
          />

          <PageButton
            class="main-header__form-btn"
            aria-label="поиск"
            @click="filterEmployee"
          >
            <IconSearch />
          </PageButton>
        </div>
      </fieldset>
    </form>

    <span
      class="help relative"
      data-name="сброс&nbsp;фильтра"
    >
      <PageButton
        class="main-header__button-reset"
        aria-label=" сброс фильтра"
        @click="resetFilter"
      >

        <IconReset />
      </PageButton>
    </span>

    <span
      class="help relative"
      data-name="алфавитная&nbsp;сортировка"
    >
      <PageButton
        class="main-header__button-alphabet"
        aria-label="алфавитная сортировка"
        @click="alphabetSort"
      >

        <IconAlphabet />
      </PageButton>
    </span>

  </div>
</template>

<script>
import IconAdd from "@/components/icons/IconAdd.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconAlphabet from "@/components/icons/IconAlphabet.vue";
import IconReset from "@/components/icons/IconReset.vue";

import PagePopup from "@/components/PagePopup.vue";
import PageButton from "@/components/UI/PageButton.vue";
import { vMaska } from "maska";

export default {
  components: { IconAdd, IconSearch, IconAlphabet, IconReset, PagePopup, PageButton },
  directives: { maska: vMaska },

  created() {
    this.$route.query.flag ? this.alphabetSort() : "";
  },

  data() {
    return {
      isOpen: false,
      selected: "",
      inputValue: null,

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
    employeeCreate() {
      this.isOpen = false;
      this.$emit("employeeCreate");
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

    filterEmployee() {
      this.inputValue =
        this.myMask === ""
          ? this.inputValue.slice(0, 1).toUpperCase() + this.inputValue.slice(1)
          : this.mask.unmasked;

      this.$emit("filterEmployee", {
        param: this.category.item,
        value: this.inputValue
      });

      this.$router.push({
        name: "basic",
        query: { name: "basic", param: this.category.item, value: this.inputValue }
      });
    },

    resetFilter() {
      this.$emit("resetFilter");

      this.$router.push({
        query: {}
      });

      this.inputValue = "";
      this.selected = "";
    },

    alphabetSort() {
      this.$emit("alphabetSort");

      this.$router.push({
        name: "basic",
        query: { flag: true }
      });
    }
  }
};
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-evenly;
  gap: 3%;

  box-sizing: border-box;
  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 10px;
}

.main-header__form {
  display: flex;
  justify-content: space-evenly;
  gap: 3%;

  width: 70%;
}

.main-header__fieldset {
  display: flex;
  gap: 15px;

  width: 100%;
  border: none;
  padding: 0;
}

.main-header__form-select,
.main-header__form-search {
  flex-grow: 1;
  box-shadow: 4px 4px 4px 1px var(--vt-c-active-2);
  padding: 7px 40px 7px 15px;
}

.main-header__form-btn {
  position: absolute;
  top: 0;
  right: 0;

  background-color: inherit;
  box-shadow: none;
  padding: 4px;
}

.main-header__wrapper {
  display: grid;
  flex-grow: 1;
}

@media screen and (max-width: 767px) {
  .main-header {
    justify-content: space-evenly;
  }

  .main-header__fieldset {
    flex-direction: column;
    width: 100%;
  }
}

@media screen and (max-width: 560px) {
  .main-header,
  .main-header__form {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .main-header__button-create,
  .main-header__button-reset,
  .main-header__button-alphabet {
    flex-grow: 1;
  }
}
</style>
