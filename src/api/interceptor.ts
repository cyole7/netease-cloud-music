import axios, { AxiosHeaders } from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { Message, Notification } from '@arco-design/web-vue'
import { clearToken, getToken } from '~/utils/auth'

export enum ResultEnum {
  /** 成功 */
  SUCCESS = 1,
  /** 失败 */
  ERROR = 0,
  /** token不正确 */
  TOKEN_ERROR = 1001,
  /** 无项目权限 */
  NO_PROJECT_AUTH = 1002,
  /** 未登录 */
  NOT_LOGIN = 1003,
  /** 无权限 */
  NO_AUTH = 1004,
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60 * 1000,
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()

    if (token) {
      if (!config.headers)
        config.headers = new AxiosHeaders()

      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    Message.error({
      content: error.message || 'Request Error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, data, msg } = response.data
    const hasSuccess = Reflect.has(response.data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess)
      return data

    switch (code) {
      case ResultEnum.TOKEN_ERROR:
      case ResultEnum.NOT_LOGIN:
        clearToken()
        break
      case ResultEnum.NO_PROJECT_AUTH:
      case ResultEnum.NO_AUTH:
        break
      default:
        break
    }
    Notification.warning({
      title: '提示',
      content: msg || 'Error',
      closable: true,
    })
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: AxiosError) => {
    if (error.message !== 'canceled') {
      Message.error({
        content: error.message || 'Request Error',
        duration: 5 * 1000,
      })
    }

    return Promise.reject(error)
  },
)

export const request = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  },
}
