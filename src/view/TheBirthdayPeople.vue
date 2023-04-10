<template>
  <TheHeader
    :link="link" />

  <template v-if="bEmployees.length > 0">
    <TheBirthdayElem
      v-for="bEmployee in bEmployees"
      :key="bEmployee.id"
      :bEmployee="{ ...bEmployee }"
    />
  </template>

  <template v-else>
    <h2 class="list__message">Сегодня нет именинников :)</h2>
  </template>

</template>

<script>
import { useEmplStore } from "@/stores/EmplStore";
import { mapState, mapActions } from "pinia";

import TheBirthdayElem from "@/components/TheBirthdayElem.vue";
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: { TheBirthdayElem, TheHeader },

  data() {
    return {
      bEmployees: {},
      link: "main"
    };
  },

  created() {
    this.bEmployees = this.getAlertBirthday("employee", this.getTodayDate);
    console.log(this.bEmployees);

    this.bEmployees = [...this.bEmployees.values()].sort((a, b) => a.cn.localeCompare(b.cn));
  },

  computed: {
    ...mapState(useEmplStore, ["getAlertBirthday", "getTodayDate"])
  },

  methods: {
    ...mapActions(useEmplStore, ["setMapEmployees"]),

    leavePage() {
      this.$router.push({
        name: "main"
      });
    }
  }
};
</script>
