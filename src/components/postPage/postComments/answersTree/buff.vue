<script setup>

import AnswersTree from "@/components/postPage/postComments/answersTree/answersTree.vue";
import {defineProps, onMounted, reactive, ref} from 'vue'
import axios from "axios";
const { kidsId } = defineProps({
  kidsId: Array,
})

const answers = ref([])

onMounted(async () => {

  kidsId.map(async (id) => {
    const answer = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)

    let time;
    time = new Date(answer.data.time * 1000);
    answer.data.date = time.toLocaleString();
    answer.data.show = false;

    answers.value.push(reactive(answer.data))
  })
})
</script>

<template>

  <section
      class="post-comment__answers"
  >
    <article class="post-comment"
             v-for="answer in answers"
             :key="answer.id"
    >
      <article class="post-comment__top" v-show="answer.text">
        <span class="post-comment__by">{{answer.by}}</span>
        <span class="post-comment__date">{{answer.date}}</span>
        <span
            class="post-comment__count"
            v-if="answer.kids"
        >
                  [{{answer.kids.length}}
                  <span v-if="answer.kids.length === 1">reply</span>
                  <span v-else>replies</span>]
                </span>
      </article>
      <article class="post-comment__bottom">
        <span class="post-comment__text" v-html="answer.text"></span>
        <answersTree
          :kidsId="answer.kids ? answer.kids : []"
        />
      </article>
    </article>
  </section>
</template>

<style scoped>
  @import "../postComments.module.scss";
</style>