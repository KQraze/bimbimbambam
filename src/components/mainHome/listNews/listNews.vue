<script setup>
  import axios from "axios";
  import { onMounted, ref } from "vue";

  const newNum = ref(null);

  const posts = ref([])

  onMounted(async () => {
    const numbers = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
    newNum.value = numbers.data

    newNum.value.map(async (data) => {
      const buff = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${data}.json?print=pretty`);
      posts.value.push(buff.data)
    })
  })




</script>

<template>
  <main class="main">
    <section class="news">
      <article class="news__new" v-for="post in posts" :key="post.id">
        <span class="news__new-name">{{post.title}}</span>
        <a class="news__new-link">{{}}</a>

      </article>
    </section>
  </main>
</template>

<style scoped>
  @import "listNews.module.scss";
</style>