import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://tsegish.onrender.com/api/",
    withCredentials: true,
})