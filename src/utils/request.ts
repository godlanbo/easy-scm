import { Message } from '@arco-design/web-vue'
import axios, { AxiosRequestConfig } from 'axios'
import router from '../router'
import { getToken } from './auth'
// import { getToken } from './auth'
// import { Message } from 'element-ui'
// import router from './../router/index'
// import loadGenerator from './loading'

const instance = axios.create({
  baseURL: `http://localhost:3000/api`,
  timeout: 5000,
})

// const load = loadGenerator()

instance.interceptors.request.use(
  config => {
    if (getToken() && config.headers) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    // load.open()
    return config
  },
  error => {
    // do something with request error
    // Message.error(error.message)
    return Promise.reject(error)
  },
)

// response interceptor
instance.interceptors.response.use(
  response => {
    // load.close()
    const res = response.data
    if (res.code !== 0) {
      Message.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || 'Has Error'))
    }
    return res
  },
  error => {
    const { response } = error
    if (response?.status === 401) {
      Message.error('登录超时，请重新登录')
      router.push({ path: `/login` })
    }
    if (response?.status === 500) {
      Message.error('非法操作')
    }
    return Promise.reject(error)
  },
)

export default instance.request
