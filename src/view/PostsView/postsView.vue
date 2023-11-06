<script setup>
  import Header from "@/components/header/header.vue";
  import PostInfo from "@/components/postPage/postInfo/postInfo.vue";
  import PostComments from "@/components/postPage/postComments/postComments.vue";
  import ResetButton from "@/components/ResetButton.vue";
  import { ref } from "vue";


  const count = ref(0)
  const iteration = () => {
    count.value++
  }

  setInterval(iteration, 60000)

</script>

<template>
  <Header />
  <resetButton @click="iteration">Обновить комментарии</resetButton>
  <main class="post">
    <postInfo :key="count"/>
    <postComments :key="count" />
  </main>

</template>

<style scoped lang="scss">
  .post {
    padding: 0 2%;
  }
</style>