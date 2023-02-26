<template>
  <div class="pagination" v-if="totalPage !== 1">
    <div class="number" v-for="page in totalPage" :key="page">
      {{ numberPage }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPage: Number,
    numberPage: Number,
  },

  data() {
    return {};
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);

  border: none;
  border-radius: 10px;
  padding: 5px 80px;
  margin: 0;
}

.pagination__page {
  width: 30px;
  height: 30px;

  outline-color: var(--vt-c-outline);
  border-radius: 6px;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-4);
}

.number {
  width: 30px;
  height: 30px;

  outline-color: var(--vt-c-outline);
  border-radius: 6px;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-4);
}

.pagination__page-current {
  border: 2px solid var(--vt-c-active-6);
}

@media (max-width: 767px) {
  .pagination {
    display: none;
  }
}
</style>
