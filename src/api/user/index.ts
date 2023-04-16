/**
 * 生成获取二维码的key
 */
export function getQrKey() {
  return request.post<{ data: { unikey: string } }>('/login/qr/key')
}

/**
 * 生成二维码
 */
export function createQrCode(data: { key: string; qrimg: number }) {
  return request.post<{ data: { qrimg: string; qrurl: string } }>('/login/qr/create', data)
}

/**
 * 轮询检查二维码是否扫描
 */
export function checkQrCode(data: { key: string }) {
  return request.post<{ code: number; cookie: string; message: string }>('/login/qr/check', data)
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return request.post('/user/subcount')
}
