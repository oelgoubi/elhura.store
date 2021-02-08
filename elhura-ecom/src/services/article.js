import axios from "axios";

require('dotenv').config();

export const fetchArticles = async () => {
    const response = await axios({
        method: 'GET',
        url: '/api/articles'
    });
    console.log("ARTICLES : ")
    console.log(response.data)
    return response.data;
}

export const listArticles = async () => {
    const response = await axios({
        method: 'GET',
        url: '/api/list-articles'
    });
    console.log("RESPONSE : "+response)
    return response.data;
}

export const getAll = async () => {
    return await axios({
        method: 'GET',
        url: "/api/articles"
    });
}

export const get = async (id) => {
    return await axios({
        method: 'GET',
        url: `/api/articles/${id}`
    });
}

export const create = async (data) => {
    return await axios({
        method: 'POST',
        url: `/api/articles`,
        data: {
            data
        }
    });
}

export const update = async (id, data) => {
    return await axios({
        method: 'PUT',
        url: `/api/articles/${id}`,
        data: {
            data
        }
    });
}

export const deleteArticle = async (id) => {
    return await axios({
        method: 'DELETE',
        url: `/api/articles/${id}`
    });
}

export const deleteAll = async () => {
    return await axios({
        method: 'DELETE',
        url: `/api/articles`
    });
}

export const findByDesignation = async (designation) => {
    return await axios({
        method: 'GET',
        url: `/api/articles?designation=${designation}`
    });
}