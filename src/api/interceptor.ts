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
    const cookie = getUserCookie()

    if (cookie)
      config.data = { ...config.data, cookie }

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
    const { code, msg } = response.data
    const hasSuccess = Reflect.has(response.data, 'code') && (
      code === ResultCode.SUCCESS || ignoreCodeList.includes(code)
    )

    if (hasSuccess)
      return response.data

    switch (code) {
      case ResultCode.NOT_LOGIN:
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
