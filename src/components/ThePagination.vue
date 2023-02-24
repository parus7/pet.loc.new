<template>
  <div class="pagination">
    <div class="pagination__page" v-for="numberPage in totalPage" :key="numberPage">
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

  created() {
    console.log(this.numberPage);
    console.log(this.totalPage);
  },
};
</script>

<style scoped>
.pagination {
  position: absolute;
  left: 25px;
  right: 25px;
  bottom: 25px;

  display: flex;
  margin-top: 15px;
  /* grid-column: 1 / 3; */
  /* grid-row: 4 / 5; */

  max-width: 1024px;
  height: 5vh;
  background-color: var(--vt-c-white-mute);
  box-shadow: 2px 2px 0 0 var(--vt-c-active-2);
  border-radius: 10px;
  padding: 5px 80px;
  margin: 0 auto;
}

.pagination__page {
  min-width: 60px;
  min-height: 60px;

  border: none;
  outline-color: var(--vt-c-outline);
  background-color: var(--vt-c-active-6);
  border-radius: 6px;
  box-shadow: 2px 2px 4px 1px var(--vt-c-active-2);
  padding: 10px;
}

.pagination__page-current {
  background-color: var(--vt-c-active-9);
}

@media (min-width: 767px) {
  .pagination {
    max-width: 1100px;
  }
}
</style>
