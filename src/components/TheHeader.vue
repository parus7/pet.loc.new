<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapActions } from "pinia";

import IconSearch from "./IconSearch.vue";
import IconFilter from "../components/IconFilter.vue";

import ThePopup from "./ThePopup.vue";

const { employees } = useEmplStore();
</script>

<template>
  <div class="container_header">
    <form @submit.prevent>
      <button type="button" class="button" @click="isOpen = true">
        Создать
      </button>

      <ThePopup
        :is-open="isOpen"
        @ok="onCreateEmployee"
        @close="isOpen = false"
      >
        Вы хотите создать нового сотрудника?
      </ThePopup>

      <div class="container-button">
        <IconFilter />

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

        <button class="button-icon btn_search" @click="convertSelected">
          <IconSearch />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: { ThePopup, IconFilter, IconSearch },

  data() {
    return {
      isOpen: false,
      selected: "",
      inputValue: null,

      categories: [
        { id: 1, text: "", item: "" },
        { id: 2, text: "пол", item: "gender" },
        { id: 3, text: "имя", item: "first_name" },
        { id: 4, text: "фамилия", item: "last_name" },
        { id: 5, text: "отчество", item: "middle_name" },
        { id: 6, text: "день рождения", item: "birthday" },
        { id: 7, text: "внутренний телефон", item: "telephone" },
        { id: 8, text: "мобильный телефон", item: "mobile" },
        { id: 9, text: "должность", item: "title" },
        { id: 10, text: "отдел", item: "department" },
        { id: 11, text: "компания", item: "company" },
        { id: 12, text: "город", item: "city" },
      ],
    };
  },

  methods: {
    ...mapActions(useEmplStore, ["createEmployee"]),

    onCreateEmployee() {
      const id = this.createEmployee().id;
      this.$router.push({ name: "form", params: { id: id } });
      this.isOpen = false;
    },

    convertSelected() {
      this.category = this.categories.find(
        (elem) => elem.text == this.selected
      );

      this.$emit("filterEmpl", {
        param: this.category.item,
        value: this.inputValue,
      });
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
  width: 260px;
}

.active_filter path {
  fill: var(--vt-c-alert-btn);
}

.btn_search {
  position: absolute;
  top: 5px;
  right: 15px;
}
.btn_search:hover path {
  fill: var(--vt-c-grey-font);
}
.btn_search:active path {
  fill: var(--vt-c-active-btn);
}
</style>
