<template>
  <div class="page">

    <template v-if="isMain">
      <PageBar
        :amountBirthdays="amountBirthdays"
      />

      <slot name="pageMainHeader"></slot>

    </template>

    <template v-else>
      <slot name="pageHeader"></slot>
    </template>

    <PageList
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
  row-gap: 10px;
  padding: 30px;
  margin: 0 auto;
}
</style>
