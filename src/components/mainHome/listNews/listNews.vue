<script setup>
  import axios from "axios";
  import { onMounted, ref } from "vue";

  const newsNum = ref(null);

  const posts = ref([])

  onMounted(async () => {

    const numbers = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
    newsNum.value = numbers.data.slice(0, 100)

    newsNum.value.map(async (data) => {
      const buff = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${data}.json?print=pretty`);


      let time;
      time = new Date(buff.data.time * 1002);

      if (buff.data.url) {
        buff.data.link = buff.data.url.split('/')[2]
      }


      buff.data.date = `${time.getDay()}.${time.getMonth()}.${time.getFullYear()}`
      posts.value.push(buff.data)
    })

    posts.value.sort((a, b) => b.time - a.time)})




</script>

<template>
  <main class="main">
    <section class="news">
      <article class="news__new" v-for="post in posts" :key="post.id">

        <span class="news__new-num">{{posts.indexOf(post) + 1}}.&nbsp;</span>
        <div class="news__new-info">
          <div class="news__new-top">
            <h1 class="news__new-name">{{post.title}}</h1>
            <a :href="post.url" class="news__new-link" v-show="post.link !== undefined">({{post.link}})</a>
          </div>
          <div class="news__new-bottom">
            <span class="news__new-score">{{post.score}} score</span>
            <span class="news__new-by">by {{post.by}}</span>
            <span class="news__new-time">{{post.date}}</span>
          </div>
        </div>


      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
  @import "listNews.module.scss";
  .main {
    font-family: Verdana, sans-serif;
  }
</style>