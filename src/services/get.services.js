import axios from 'axios';

export const NewsService = {

    async getIndexNews() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}v0/newstories.json`)

        return response.data;
    },

    async getNews(data) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}v0/item/${data}.json`)

        return response.data;
    }
}