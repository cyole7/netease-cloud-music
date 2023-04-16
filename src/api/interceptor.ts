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
  /** 未登录 */
  NOT_LOGIN = 302,
  /** 二维码过期 */
  QR_CODE_EXPIRED = 800,
  /** 等待扫码 */
  WAITING_FOR_SCAN = 801,
  /** 待确认 */
  WAITING_FOR_CONFIRM = 802,
  /** 授权登录成功 */
  AUTHORIZED_LOGIN_SUCCESS = 803,
}

const ignoreCodeList = [
  ResultEnum.QR_CODE_EXPIRED,
  ResultEnum.WAITING_FOR_SCAN,
  ResultEnum.WAITING_FOR_CONFIRM,
  ResultEnum.AUTHORIZED_LOGIN_SUCCESS,
]

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60 * 1000,
  withCredentials: true,
})

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken()

    if (token) {
      if (!config.headers)
        config.headers = new AxiosHeaders()

      config.headers.Authorization = `Bearer ${token}`
    }

    config.url = `${config.url}${config.url?.includes('?') ? '&' : '?'}timestamp=${useTimestamp().value}`

    return config
  },
  (error: AxiosError) => {
    message.error(error.message || 'Request Error')
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data
    const hasSuccess = Reflect.has(response.data, 'code') && (
      code === ResultEnum.SUCCESS || ignoreCodeList.includes(code)
    )

    if (hasSuccess)
      return response.data

    switch (code) {
      case ResultEnum.NOT_LOGIN:
        isLoginDialogOpen.value = true
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
