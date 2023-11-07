import axios from "axios";

const env = import.meta.env

const httpClient = axios.create({
  baseURL: env.VITE_API_BASE_URL
})

httpClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    const tokenType = localStorage.getItem("tokenType")
    if (tokenType && accessToken) {
      config.headers["Authorization"] = tokenType + ' ' + accessToken
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpClient
