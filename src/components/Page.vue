<template>
  <div class="page">

    <template v-if="isMain">
      <slot name="pageMainHeader"></slot>

      <PageBar
        class="page_bar"
        :amountBirthdays="amountBirthdays"
      />
    </template>

    <template v-else>
      <slot name="pageHeader"></slot>
    </template>

    <PageList
      class="page_list"
      :employees="[...employees]"
      :message="message"
      :isMain="isMain"
      :isMarked="isMarked"
      @deleteEmployee="$emit('deleteEmployee',  $event )"
    />
  </div>
</template>

<script>
import PageMainHeader from "@/components/PageMainHeader.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageBar from "@/components/PageBar.vue";
import PageList from "@/components/PageList.vue";

export default {
  components: { PageMainHeader, PageHeader, PageList, PageBar },

  props: {
    employees: Object,
    message: String,
    amountBirthdays: Number,
    isMain: Boolean,
    isMarked: Boolean
  }
};
</script>

<style>
.page {
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 10px;
  row-gap: 10px;
  padding: 30px;
  margin: 0 auto;
}

.page_bar {
  grid-column: 1/2;
  grid-row: 2/4;
}

.page_list {
  grid-column: 2/3;
}

@media screen and (max-width: 991px) {
  .page_list {
    grid-column: 1/-1;
  }

  .page_bar {
    grid-row: 1/2;
    grid-column: 1/-1;
  }

  .page_bar {
    margin: 0;
  }
}
</style>
