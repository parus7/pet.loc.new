<template>
  <PageCard
    :employee="employee"
    :isEdit="isEdit"
    :isMain="isMain"
    @editOk="isEdit=true"
    @editNo="isEdit=false"
  />
</template>

<script>
import PageCard from "@/components/PageCard.vue";
import { mapState } from "pinia";
import { useEmplStore } from "@/stores/EmplStore";

export default {
  components: { PageCard },

  data() {
    return {
      employee: {},
      isEdit: false,
      isMain: true
    };
  },

  created() {
    const paramsId = this.$route.params.id;
    this.employee = { ...this.getEmployeeById("archive", paramsId) };
  },

  computed: {
    ...mapState(useEmplStore, ["getEmployeeById"])
  }
};
</script>

