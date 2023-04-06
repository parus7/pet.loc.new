<template>
  <TheCard
    :visible="visible"
    :is-edit="isEdit"
    :employee="employee"
    :link="link" />
</template>

<script>
import TheCard from "@/components/TheCard.vue";
import { mapState } from "pinia";
import { useEmplStore } from "@/stores/EmplStore";

export default {
  components: { TheCard },

  data() {
    return {
      employee: {},
      visible: false,
      isEdit: false,
      link: "archive"
    };
  },

  created() {
    let paramsId = this.$route.params.id;
    this.employee = { ...this.getEmployeeById("archive", paramsId) };
  },

  computed: {
    ...mapState(useEmplStore, ["getEmployeeById"])
  }
};
</script>

