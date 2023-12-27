import axios from "axios";
import {API_KEY} from "../utils/consts.ts";

export const instance = axios.create({
    baseURL: API_KEY
});




instance.interceptors.request.use(
    async config => {
        config.headers['Accept'] = 'application/json'
        config.withCredentials = true
        return config
    },
    error => {
        Promise.reject(error)
    }

);