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
    <div class="container post__container">
      <postInfo :key="count"/>
      <postComments :key="count" />
    </div>
  </main>


</template>

<style scoped lang="scss">
  @include desktop {

    .post__container {
      box-sizing: border-box;
      margin-top: 18px;
      border: 3px solid rgba(255, 228, 200, 0.26);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 8px 0 rgba(203, 178, 148, 0.48);
      padding: 12px 10px;
      background: linear-gradient(236deg, rgba(255,235,222,1) 0%, rgba(255,255,255,1) 100%);
    }

  }

  @include desk-to-tab {

    .post__container {
      margin: 18px 1%;
      border: 3px solid rgba(255, 228, 200, 0.26);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 8px 0 rgba(203, 178, 148, 0.48);
      padding: 12px 10px;
      background: linear-gradient(236deg, rgba(255,235,222,1) 0%, rgba(255,255,255,1) 100%);
    }

  }

  @include tablet {

    .post__container {
      margin-top: 16px;
      border: 2.5px solid rgba(255, 228, 200, 0.26);
      overflow: hidden;
      border-radius: 18px;
      box-shadow: 0 0 6px 0 rgba(203, 178, 148, 0.48);
    }

  }

  @include mobile {

    .post__container {
      margin-top: 14px;
      border: 2.2px solid rgba(255, 228, 200, 0.26);
      border-radius: 16px;
      box-shadow: 0 0 4px 0 rgba(203, 178, 148, 0.48);
    }

  }
</style>