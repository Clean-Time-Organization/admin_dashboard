import axios from "axios";

const env = import.meta.env

const httpClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  validateStatus: function (status) {
    if ([500, 503].includes(status)) {
      window.history.pushState({}, status.toString(), "/" + status.toString())
      window.location.reload()
    }
    return status === 200
  },
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
    console.dir(error)
    return Promise.reject(error)
  }
)

export default httpClient
