<script setup>

import {onMounted, reactive, ref} from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
import answersTree from "@/components/postPage/postComments/answersTree/answersTree.vue";

  const comNum = ref(null)

  const comments = ref([])

  onMounted(async () => {
    const Route = useRoute()
    const id = Route.params.id
    const data = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    comNum.value = data.data.kids

    comNum.value.map( async (data) => {
      const buff = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${data}.json?print=pretty`)

      let time;
      time = new Date(buff.data.time * 1000);

      buff.data.date = time.toLocaleString();
      buff.data.show = false;

      comments.value.push(reactive(buff.data))
    })
  })
</script>

<template>
  <section class="post-comments"
           v-if="comments.length !== 0"
  >
    <h1 class="post-comments__name">Comments:</h1>

    <article class="post-comment post-comment_parent"
             v-for="comment in comments"
             :key="comment.id"
    >
      <article class="post-comment__top">
        <span class="post-comment__by">{{comment.by}}</span>
        <span class="post-comment__date">{{comment.date}}</span>
        <span
          class="post-comment__count"
          v-if="comment.kids"
        >
          [{{comment.kids.length}}
           <span v-if="comment.kids.length === 1">reply</span>
           <span v-else>replies</span>]
        </span>
      </article>

      <article class="post-comment__bottom">
        <span class="post-comment__text" v-html="comment.text"></span>
        <span
            class="post-comment__show"
            @click="comment.show = !comment.show"
        >
          <span v-if="comment.show === false">Show replies</span>
          <span v-else>Hide replies</span>
        </span>
        <answersTree
            v-if="comment.show !== false"
            :kidsId="comment.kids ? comment.kids : []"
        />
      </article>
    </article>
  </section>
</template>

<style scoped>
  @import "postComments.module.scss";
</style>