import type { AxiosRequestConfig } from 'axios'
import type { QrImageCheckRes, QrImageParams, QrImageRes } from './types'

/**
 * 生成获取二维码的key
 */
export function getQrKey(config?: AxiosRequestConfig) {
  return request.post<{ data: { unikey: string } }>('/login/qr/key', {}, config)
}

/**
 * 生成二维码
 */
export function createQrCode(data: QrImageParams, config?: AxiosRequestConfig) {
  return request.post<{ data: QrImageRes }>('/login/qr/create', data, config)
}

/**
 * 轮询检查二维码是否扫描
 */
export function checkQrCode(data: { key: string }, config?: AxiosRequestConfig) {
  return request.post<QrImageCheckRes>('/login/qr/check', data, config)
}

/**
 * 退出登录
 */
export function logout() {
  return request.post('/logout')
}
