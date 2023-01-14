<script setup>
import TheCard from "./TheCard.vue";
import { useEmplStore } from "../../stores/EmplStore";

const { employees } = useEmplStore();
</script>

<template>
  <TheCard />
</template>
