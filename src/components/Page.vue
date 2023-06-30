<template>
  <div class="page">

    <div class="page__header-box">

      <template v-if="isMain">
        <PageBar
          :amountBirthdays="amountBirthdays"
        />

        <slot name="pageMainHeader"></slot>

      </template>

      <template v-else>
        <slot name="pageHeader"></slot>
      </template>
    </div>

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
  box-sizing: border-box;
  padding: 0 30px 30px;
  margin: 0 auto;
}

.page__header-box {
  position: sticky;
  top: 0;
  left: 0;
  display: grid;
  row-gap: 10px;
  background-color: var(--vt-c-white);
  padding: 30px 0 10px;
  z-index: 999;
}
</style>
