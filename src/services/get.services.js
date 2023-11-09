import axios from 'axios';

export const NewsService = {

    async getIndexNews() {
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json')

        return response.data;
    },

    async getNews(data) {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${data}.json`)

        return response.data;
    }
}