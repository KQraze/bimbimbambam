<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";


  const post = ref(null)

  onMounted(async () => {

    const Route = useRoute()
    const id = Route.params.id;
    const data = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    data.data.url ? data.data.link = data.data.url.split('/')[2] : null

    let time;
    time = new Date(data.data.time * 1000);

    data.data.date = time.toLocaleString();

    post.value = data.data;

  })

</script>

<template>
  <section class="post-info" v-if="post">
    <article class="post-info__top">
      <h1 class="post-info__title">{{post.title}}</h1>
      <a :href="post.url" class="post-info__link" v-show="post.link !== undefined">({{post.link}})</a>
    </article>
    <article class="post-info__bottom">
      <span class="post-info__score">{{post.score}} score</span>
      <span class="post-info__by">by {{post.by}}</span>
      <span class="post-info__time">{{post.date}}</span>
      <span class="post-info__comments">{{post.descendants}}
        <span v-if="post.descendants === 0 || post.descendants === 1">comment</span>
        <span v-else>comments</span>
      </span>
    </article>

  </section>
</template>

<style scoped>
  @import "postInfo.scss";
</style>