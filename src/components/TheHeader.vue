<script setup>
import { useEmplStore } from ".././stores/EmplStore";
import { mapActions } from "pinia";

import IconSearch from "./IconSearch.vue";
import ThePopup from "./ThePopup.vue";

const { employees } = useEmplStore();
</script>

<template>
  <div class="container_header">
    <form>
      <input
        type="text"
        name="search"
        id="search"
        class="search"
        placeholder="Поиск..."
      />
      <button type="submit" class="button-icon btn_search">
        <IconSearch />
      </button>

      <button type="button" class="button" @click="isOpen = true">
        Создать
      </button>

      <ThePopup
        :is-open="isOpen"
        @ok="onCreateEmployee"
        @close="isOpen = false"
      >
        Вы хотите создать карточку нового сотрудника?
      </ThePopup>
    </form>
  </div>
</template>

<script>
export default {
  components: { IconSearch, ThePopup },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    ...mapActions(useEmplStore, ["createEmployee"]),

    onCreateEmployee() {
      const id = this.createEmployee().id;
      this.$router.push({ name: "form", params: { id: id } });
      this.isOpen = false;
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
  padding: 10px;
}

form {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
}
.search {
  position: relative;
  width: 250px;
  outline: none;
}
.btn_search {
  position: absolute;
  top: 5px;
  left: 220px;
}

.btn_search:hover path {
  fill: var(--vt-c-grey-font);
}

.btn_search:active path {
  fill: var(--vt-c-active-btn);
}
</style>
