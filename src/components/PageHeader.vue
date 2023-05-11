<template>
  <div class="header">

    <template v-if="isArchive">
      <input
        id="search"
        type="text"
        class="header__form-search"
        ref="archiveSearch"
        aria-label="поле поиска"
        placeholder="Поиск..."
        v-model="inputValue"
        @input="onFilterBasicData($event)"
      />
    </template>

    <RouterLink
      :to="{ name: 'basic' }"
      tabindex="-1">

      <div
        class=" help " data-name="на главную страницу">
        <PageButton
          area-label="на главную страницу"
          tabindex="0"
        >
          <IconGoTo />
        </PageButton>
      </div>

    </RouterLink>

  </div>
</template>

<script>
import PageButton from "@/components/UI/PageButton.vue";
import IconGoTo from "@/components/icons/IconGoTo.vue";

export default {
  components: { PageButton, IconGoTo },

  props: {
    isArchive: Boolean
  },

  data() {
    return {
      inputValue: "",
      focused: true
    };
  },

  created() {
    this.inputValue = this.$route.query.value;
  },

  mounted() {
    const archiveSearch = this.$refs.archiveSearch;
    archiveSearch.focus();
  },

  methods: {
    onFilterBasicData(event) {
      const eventInSearch = event.target.value;

      this.$emit("searchArchiveEmpl",
        { params: eventInSearch });

      this.$router.push({ name: "archive", query: { value: eventInSearch } });
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: end;
  column-gap: 30px;
  grid-column: 1/-1;

  background-color: var(--vt-c-archive-2);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-5);
  border-radius: 8px;
  padding: 10px;
}

.header__form-search {
  width: 60%;
}

@media screen and (max-width: 425px) {
  .header {
    column-gap: 20px;
  }
}
</style>
