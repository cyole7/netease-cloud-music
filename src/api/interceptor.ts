import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ResultCode } from '~/constants'

const ignoreCodeList = [
  ResultCode.QR_CODE_EXPIRED,
  ResultCode.WAITING_FOR_SCAN,
  ResultCode.WAITING_FOR_CONFIRM,
  ResultCode.AUTHORIZED_LOGIN_SUCCESS,
]

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60 * 1000,
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.noCache) {
      config.url = config.url?.includes('?')
        ? `${config.url}&timestamp=${useTimestamp().value}`
        : `${config.url}?timestamp=${useTimestamp().value}`
    }

    return config
  },
  (error: AxiosError) => {
    NMessage.error(error.message || 'Request Error')
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    let { code, msg } = response.data
    // 部分接口code位置不同
    const hasSuccess = !Reflect.has(response.data, 'code') || (
      code === ResultCode.SUCCESS || ignoreCodeList.includes(code)
    )

    if (hasSuccess)
      return response.data

    switch (code) {
      case ResultCode.NOT_LOGIN:
        msg = '请先登录'
        openLoginDialog()
        break
      default:
        break
    }
    NMessage.error(msg || 'Error')
    return Promise.reject(new Error(msg || 'Error'))
  },
  (error: AxiosError) => {
    if (error.message !== 'canceled')
      NMessage.error(error.message || 'Request Error')

    return Promise.reject(error)
  },
)

export const request = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config)
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config)
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config)
  },
}
