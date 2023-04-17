import { STORAGE_COOKIES_KEY } from '~/constants'

const cookieStorage = useStorage(STORAGE_COOKIES_KEY, '')

export function isLogin() {
  return !!cookieStorage.value
}

export function getUserCookie() {
  return cookieStorage.value
}

export function setUserCookie(token: string) {
  cookieStorage.value = token
}

export function clearUserCookie() {
  cookieStorage.value = ''
}
