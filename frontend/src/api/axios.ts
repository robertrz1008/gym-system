import axios from "axios"

const http = "http://localhost:3000/api/"

const instance = axios.create({
    baseURL: http,
    withCredentials: true
})

export default instance