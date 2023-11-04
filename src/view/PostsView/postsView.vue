<script setup>
  import Header from "@/components/header/header.vue";
  import PostInfo from "@/components/postPage/postInfo/postInfo.vue";
  import PostComments from "@/components/postPage/postComments/postComments.vue";
  import ResetButton from "@/components/ResetButton.vue";

</script>

<template>
  <Header />
  <resetButton>Обновить комментарии</resetButton>
  <main class="post">
    <postInfo />
    <postComments />
  </main>

</template>

<style scoped lang="scss">
  .post {
    padding: 0 2%;
  }
</style>