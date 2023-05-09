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
      isMain: false
    };
  },

  created() {
    const paramsId = this.$route.params.id;
    this.employee = { ...this.getEmployeeById("employees", paramsId) };
  },

  computed: {
    ...mapState(useEmplStore, ["getEmployeeById"])
  }
};
</script>