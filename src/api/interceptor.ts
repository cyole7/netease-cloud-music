import axios, { AxiosHeaders } from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { getToken } from '~/utils'

export enum ResultEnum {
  /** 成功 */
  SUCCESS = 200,
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
    message.error(error.message || 'Request Error')
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    const hasSuccess = Reflect.has(response.data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess)
      return response.data

    switch (code) {
      case ResultEnum.TOKEN_ERROR:
      case ResultEnum.NOT_LOGIN:
        break
      default:
        break
    }
    message.error(msg || 'Error')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: AxiosError) => {
    if (error.message !== 'canceled')
      message.error(error.message || 'Request Error')

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
