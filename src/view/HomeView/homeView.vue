<script setup>
import Header from "@/components/header/header.vue";
import ListNews from "@/components/mainHome/listNews/listNews.vue";
import { ref } from "vue";
import ResetButton from "@/components/ResetButton.vue";

  let listNewsKey = ref(0);

  const interval = () => {
    listNewsKey.value++
  }

  setInterval(interval, 60000);
</script>

<template>
  <Header>
    <reset-button @click="interval">Обновить список</reset-button>
  </Header>

  <list-news :key="listNewsKey"/>
</template>

<style scoped lang="scss">

</style>