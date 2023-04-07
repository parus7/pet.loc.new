<template>
  <TheCard
    :visible="visible"
    :is-edit="isEdit"
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
      visible: false,
      isEdit: true,
      link: "main"
    };
  },

  created() {
    let paramsId = this.$route.params.id;
    // console.log(paramsId);
  },

  computed: {
    ...mapState(useEmplStore, ["getEmployeeById"])
  }
};
</script>
