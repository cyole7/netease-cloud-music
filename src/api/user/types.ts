export interface QrImageParams {
  key: string
  qrimg?: boolean
}

export interface QrImageRes {
  qrimg: string
  qrurl: string
}

export interface QrImageCheckRes {
  code: number
  cookie: string
  message: string
}
