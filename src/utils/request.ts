import { axiosRequestAdapter } from '@alova/adapter-axios'
import { createAlova } from 'alova'
import ReactHook from 'alova/react'
import axios from 'axios'

// 创建axios实例
const axiosInstance = axios.create({
  timeout: 10000 // 请求超时时间
})

// 创建alova实例
const alova = createAlova({
  // 关闭全局缓存
  cacheFor: null,
  // 请求适配器，使用axios请求适配器
  requestAdapter: axiosRequestAdapter({
    // 传入axios实例
    axios: axiosInstance
  }),
  // 全局响应拦截
  responded: (response) => {
    // 对于axios适配器，response就是axios的响应对象
    // axios已自动解析JSON，所以直接返回data即可
    return response.data
  },
  statesHook: ReactHook
})

export { alova }
