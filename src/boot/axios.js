import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API_HOST })
const axiosInstance = axios.create({ baseURL: process.env.API_HOST })

axiosInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token')
  console.log('Token carregado do localStorage:', token)
  if (token) {
    // Definindo o header Authorization com o formato correto
    config.headers.Authorization = `Bearer ${token}`
    console.log('Header de autorização configurado:', config.headers.Authorization)
  } else if (!window.location.href.endsWith('login')) {
    // Redireciona para a página de login se não houver token
    document.location.href = '/#/login'
    return Promise.reject()
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = axiosInstance
})

export { axios, axiosInstance }

// const api = axios.create({ baseURL: process.env.API_HOST })
// const axiosInstance = axios.create({ baseURL: process.env.API_HOST })

// axiosInstance.interceptors.request.use(async (response) => {
//   if (localStorage.getItem('access_token')) {
//     const token = localStorage.getItem('access_token')
//     axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
//     response.headers.common.Authorization = `Bearer ${token}`
//     return response
//   }
//   if (!window.location.href.endsWith('login')) {
//    // If the current url is not login and all tokens are stale or missing - redirect to login page. A hack, of course, but it works
//     document.location.href = '/#/login'
//     return Promise.reject()
//   }
//   return response
// })
