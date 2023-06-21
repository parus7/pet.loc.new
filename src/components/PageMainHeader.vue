<template>
  <div class="main-header">
    <span
      class="tooltip tooltip-position"
      data-name="сбросить&nbsp;цветные&nbsp;ярлыки "
    >
      <PageButton
        class="main-header__reset-marks"
        @click="isOpenMark = true"
      >
          <IconMarksReset />
      </PageButton>

      <PagePopup
        :is-open="isOpenMark"
        @close="isOpenMark = false"
        @ok="resetColorMarks()"
      >
         Вы хотите сбросить цветные ярлыки?
      </PagePopup>
    </span>

    <span
      class="tooltip tooltip-position"
      data-name="создать&nbsp;карточку "
    >
        <PageColorButton
          class="main-header__button-create"
          aria-label="создать сотрудника"
          @click="isOpenCreate = true"
        >
          <IconAdd />
        </PageColorButton>

               <PagePopup
                 :is-open="isOpenCreate"
                 @close="isOpenCreate = false"
                 @ok="employeeCreate()"
               >
             Вы хотите создать карточку нового сотрудника?
                </PagePopup>
      </span>

    <div class="main-header__wrap">
      <select
        class="main-header__form-select"
        aria-label="поле выбора категории для поиска"
        v-model="selected"
        @change="onMask"
      >
        <option value="" disabled>Выбор категории...</option>
        <option v-for="category in categories" :key="category.text">
          {{ category.text }}
        </option>
      </select>

      <input
        class="main-header__form-search"
        aria-label="поле поиска"
        placeholder="Поле поиска..."
        v-model.lazy="inputValue"
        v-maska="mask"
        :data-maska="myMask"
        @keyup.enter="filterEmployee"
      />
    </div>

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
        tabindex="5"
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
import PageButton from "./UI/PageButton.vue";
import IconMarksReset from "@/components/icons/IconMarksReset.vue";

import PageColorButton from "@/components/UI/PageColorButton.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import IconSearch from "@/components/icons/IconSearch.vue";
import IconFilterReset from "@/components/icons/IconFilterReset.vue";

import PagePopup from "@/components/PagePopup.vue";
import { vMaska } from "maska";

export default {
  components: { PageButton, IconMarksReset, PageColorButton, IconAdd, IconSearch, IconFilterReset, PagePopup },
  directives: { maska: vMaska },
  name: "PageMainHeader",

  props: {
    isAlphabet: Boolean,
    employeesLength: Number,
    message: String
  },

  data() {
    return {
      myMask: "",
      mask: {
        masked: "",
        unmasked: "",
        completed: false
      },

      isMark: false,
      selected: "",
      isOpenCreate: false,
      isOpenMark: false,

      category: {},
      inputValue: "",

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
        { text: "хэштег", item: "hashtag" }
      ]
    };
  },

  methods: {
    resetColorMarks() {
      this.isMark = !this.isMark;
      this.$emit("resetMarks", { mark: this.isMark });
      this.isOpenMark = false;
    },

    employeeCreate() {
      this.$emit("employeeCreate", { create: true });
      this.isOpenCreate = false;
    },

    transformCategory() {
      return this.categories.find((elem) => elem.text === this.selected);
    },

    onMask() {
      this.category = this.transformCategory();

      this.myMask =
        this.category.item === "birthday" ? "##.##"
          : this.category.item === "telephone" ? "##-##"
            : this.category.item === "mobile" ? "### ###-##-##"
              : "";
    },

    filterEmployee() {
      this.inputValue =
        this.myMask === "" ? this.inputValue.toLowerCase() : this.mask.unmasked;

      this.$emit("filterEmployee", {
        category: this.category.item,
        value: this.inputValue
      });

      this.$router.push({
        name: "basic",
        query: {
          selected: this.selected,
          category: this.category.item,
          value: this.inputValue
        }
      });
    },

    resetFilter() {
      this.$emit("resetFilter");

      this.inputValue = "";
      this.selected = "";

      this.$router.push({
        name: "basic",
        query: {}
      });
    },

    alphabetSort() {
      this.$emit("alphabetSort");
    },

    changeButtonRole() {
      return !(this.$route.query && this.$route.query.value && this.$route.query.category);
    },

    blockAlphabetButton() {
      return this.employeesLength <= 2;
    },

    blockWithMissingParams() {
      return !(this.inputValue && this.category.item && this.selected);
    }
  }
};
</script>

<style scoped>
.main-header {
  display: grid;
  grid-template-columns:  repeat(5, auto);

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 8px;
  padding: 10px 10px 10px 75px;
}

.main-header__reset-marks {
  align-self: center;
}

.main-header__wrap {
  display: flex;
  gap: 35px;
}

.main-header__form-select,
.main-header__form-search {
  padding: 5px 15px;
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

@media screen and (max-width: 991px) {
  .main-header {
    padding: 10px;
  }
}

@media screen and (max-width: 800px) {
  .main-header {
    grid-template-columns:auto auto 1fr auto auto;
    gap: 10px;
  }

  .main-header__wrap {
    flex-direction: column;
    gap: 15px;
  }

  .tooltip-position:hover::after {
    bottom: 95px;
  }
}

@media screen and (max-width: 620px) {
  .main-header {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .main-header__reset-marks,
  .main-header__button-create,
  .main-header__button-reset,
  .main-header__button-search,
  .main-header__button-alphabet {
    width: 100%;
  }

  .main-header__button-alphabet {
    padding: 11px 25px;
  }

  .tooltip-position:hover::after {
    bottom: 40px;
  }
}
</style>
