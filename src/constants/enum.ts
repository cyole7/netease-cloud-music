export enum ResultCode {
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
