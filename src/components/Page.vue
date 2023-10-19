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

    <div class="page__footer-box">
      <PageFooter
        class="page__footer"
        :isMain="isMain"
      />
    </div>

  </div>
</template>

<script>
import PageMainHeader from "@/components/PageMainHeader.vue";
import PageHeader from "@/components/PageHeader.vue";
import PageBar from "@/components/PageBar.vue";
import PageList from "@/components/PageList.vue";
import PageFooter from "@/components/PageFooter.vue";

export default {
  components: { PageMainHeader, PageHeader, PageList, PageBar, PageFooter },

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

.page__header-box,
.page__footer-box {
  position: sticky;
  top: 0;
  left: 0;
  display: grid;
  row-gap: 10px;
  background-color: var(--vt-c-white);
  border-radius: 8px;
  padding: 30px 0 20px;
  z-index: 999;
}

.page__footer-box {
  /*bottom: 0;*/
  padding: 20px 0 30px;
}
</style>
