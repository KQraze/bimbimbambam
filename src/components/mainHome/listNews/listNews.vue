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

      buff.data.url ? buff.data.link = buff.data.url.split('/')[2] : null

      let time;
      time = new Date(buff.data.time * 1000);

      buff.data.date = time.toLocaleString();

      posts.value.push(buff.data)
    })
  })
</script>

<template>
  <main class="main">
    <section class="news">
      <article class="news__new" v-for="post in posts" :key="post.id">

        <span class="news__new-num">{{posts.indexOf(post) + 1}}.&nbsp;</span>
        <div class="news__new-info">
          <div class="news__new-top">
            <router-link :to="{ name: 'post', params: { id: post.id} }" class="news__new-name">{{post.title}}</router-link>
            <a :href="post.url" class="news__new-link" v-show="post.link !== undefined">({{post.link}})</a>
          </div>
          <div class="news__new-bottom">
            <span class="news__new-score">{{post.score}} score</span>
            <span class="news__new-by">by {{post.by}}</span>
            <span class="news__new-time">{{post.date}}</span>
            <span class="news__new-comments">{{post.descendants}}
              <span v-if="post.descendants === 0 || post.descendants === 1">comment</span>
              <span v-else>comments</span>
            </span>
          </div>
        </div>

      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
  @import "listNews.module.scss";
</style>