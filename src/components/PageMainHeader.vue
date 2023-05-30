<template>
  <div class="main-header">
    <form class="main-header__form" @submit.prevent>
      <span class="tooltip tooltip-position" data-name="создать&nbsp;карточку ">

        <PageColorButton
          class="main-header__button-create"
          aria-label="создать сотрудника"
          @click="isOpen = true"
        >
          <IconAdd />
        </PageColorButton>

        <PagePopup
          :is-open="isOpen"
          @close="isOpen = false"
          @ok="employeeCreate($event)"
        >
          <template #popupText>
            Вы хотите создать карточку нового сотрудника?
          </template>

        </PagePopup>
      </span>

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

        <input
          id="search"
          type="text"
          class="main-header__form-search"
          aria-label="поле поиска"
          placeholder="Поле поиска..."
          v-model.lazy="inputValue"
          v-maska="mask"
          :data-maska="myMask"
          @keyup.enter="filterEmployee"
        />

      </fieldset>
    </form>

    <template v-if="changeButtonRole()">
      <span class=" tooltip tooltip-position" data-name="поиск">

    <PageColorButton
      class="main-header__button-search"
      :disabled=" blockWithMissingParams()"
      aria-label=" поиск"
      @click="filterEmployee"
    >
      <IconSearch />
    </PageColorButton>

    </span>
    </template>

    <template v-else>
    <span
      class="tooltip tooltip-position"
      data-name="сброс&nbsp;фильтра"
    >
      <PageColorButton
        class="main-header__button-reset"
        aria-label=" сброс&nbsp;фильтра"
        @click="resetFilter"
      >
        <IconFilterReset />
      </PageColorButton>
    </span>
    </template>

    <span
      class="tooltip tooltip-position"
      data-name="по&nbsp;алфавиту"
    >
       <template v-if="isAlphabet">
      <PageColorButton
        class="main-header__button-alphabet"
        aria-label="алфавитная сортировка от А до Я"
        :disabled="blockAlphabetButton()"
        @click="alphabetSort"
      >
          а&nbsp;-&nbsp;я
         </PageColorButton>

       </template>

        <template v-else>
      <PageColorButton
        class="main-header__button-alphabet"
        aria-label="алфавитная сортировка от Я до А"
        :disabled="blockAlphabetButton()"
        @click="alphabetSort"
      >
        я&nbsp;-&nbsp;а
         </PageColorButton>

    </template>
       </span>

  </div>
</template>

<script>
import IconAdd from "@/components/icons/IconAdd.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconFilterReset from "@/components/icons/IconFilterReset.vue";

import PagePopup from "@/components/PagePopup.vue";
import PageColorButton from "@/components/UI/PageColorButton.vue";
import { vMaska } from "maska";

export default {
  components: { IconAdd, IconSearch, IconFilterReset, PagePopup, PageColorButton },
  directives: { maska: vMaska },
  name: "PageMainHeader",

  created() {
    this.inputValue = this.$route.query.value;
    this.selected = this.$route.query.param || "";
  },

  props: {
    isAlphabet: Boolean,
    filteredEmployees: Object,
    message: String
  },

  data() {
    return {
      isOpen: false,
      selected: null,
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
          ? this.inputValue.toLowerCase()
          : this.mask.unmasked;

      this.$router.push({
        name: "basic",
        query: {
          param: this.category.item,
          value: this.inputValue
        }
      });

      this.$emit("filterEmployee", {
        param: this.category.item,
        value: this.inputValue
      });
    },

    resetFilter() {
      this.$emit("resetFilter");

      this.inputValue = "";
      this.selected = "";
      this.category = "";

      this.$router.push({
        name: "basic",
        query: {}
      });
    },

    alphabetSort() {
      this.$emit("alphabetSort");
    },

    changeButtonRole() {
      return !(this.$route.query
        && this.$route.query.value
        && this.$route.query.param
      );
    },

    blockAlphabetButton() {
      return this.message === "Нет сотрудников, соответствующих вашему поиску"
        || this.message === "Список сотрудников пуст";
    },

    blockWithMissingParams() {
      return !(this.inputValue && this.category && this.selected);
    }
  }
};
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-evenly;
  gap: 3%;
  grid-column: 1/3;

  box-sizing: border-box;
  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 10px;
}

.main-header__form {
  display: flex;
  justify-content: space-between;
  gap: 3%;
  width: 95%;
}

.main-header__fieldset {
  display: flex;
  gap: 15px;

  width: 70%;
  border: none;
  padding: 0;
}

.main-header__form-select,
.main-header__form-search {
  flex-grow: 1;
  box-shadow: 4px 4px 4px 1px var(--vt-c-active-2);
  padding: 7px 40px 7px 15px;
}

.main-header__button-alphabet {
  font-size: 0.9rem;
  letter-spacing: -1.5px;
}

.main-header__button-alphabet:hover {
  transform: scale(1.03);
}

.tooltip-position:hover::after {
  left: 0;
}

@media screen and (max-width: 767px) {
  .main-header {
    justify-content: space-evenly;
  }

  .main-header__fieldset {
    flex-direction: column;
    width: 100%;
  }

  .tooltip-position:hover::after {
    bottom: 95px;
  }
}

@media screen and (max-width: 560px) {
  .main-header,
  .main-header__form {
    flex-direction: column;
    gap: 18px;
    width: 100%;
  }

  .main-header__form-select,
  .main-header__form-search {
    padding: 11px 40px 11px 15px;
  }

  .main-header__button-create,
  .main-header__button-reset,
  .main-header__button-search,
  .main-header__button-alphabet {
    flex-grow: 1;
  }

  .main-header__button-alphabet {
    padding: 11px 25px;
  }

  .tooltip-position:hover::after {
    bottom: 40px;
  }
}
</style>
