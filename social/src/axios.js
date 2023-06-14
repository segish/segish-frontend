import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://segish-social.onrender.com/api/",
    withCredentials: true,
})
