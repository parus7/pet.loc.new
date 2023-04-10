<template>
  <TheCard
    :employee="employee"
    :isEdit="isEdit"
    :isArchive="isArchive"
    :link="link"
    @editOk="isEdit=true"
    @editNo="isEdit=false"
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
      isArchive: false,
      link: "main"
    };
  },

  created() {
    let paramsId = this.$route.params.id;
    this.employee = { ...this.getEmployeeById("employees", paramsId) };
  },

  computed: {
    ...mapState(useEmplStore, ["getEmployeeById"])
  }
};
</script>