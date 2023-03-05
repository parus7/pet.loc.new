<template>
  <div class="pagination" v-if="totalPage !== 1">
    <div class="pagination__page" v-for="page in totalPage" :key="page">
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalPage: Number,
  },

  // data() {
  //   return {};
  // },

  // methods: {
  //   get() {
  //     console.log(this.totalPage);
  //   },
  // },
};
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);

  border: none;
  border-radius: 10px;
  padding: 10px 80px;
  margin: 0;
}

.pagination__page {
  flex-basis: 30px;
  outline-color: var(--vt-c-outline);
  border-radius: 6px;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-4);
  padding: 10px 15px;
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
