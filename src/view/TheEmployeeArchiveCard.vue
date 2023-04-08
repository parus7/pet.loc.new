<template>
  <TheCard
    :employee="employee"
    :isEdit="isEdit"
    :isArchive="isArchive"
    :link="link"
  />
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
      isEdit: false,
      isArchive: true,
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

