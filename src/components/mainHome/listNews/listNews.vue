<script setup>
  import axios from "axios";



  let data;
  const getData = () => {
    axios
    .get(`https://hacker-news.firebaseio.com/v0/item/8943.json?print=pretty`)
    .then(response => {
      data = response.data;
    })
    .catch(error => console.log(error))
  }
  getData()





</script>

<template>
  <main class="main">
    <section class="news">
      <article class="news__new">
        МЯУ
      </article>
    </section>
  </main>
</template>

<style scoped>
  @import "listNews.module.scss";
</style>