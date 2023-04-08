import { request } from '~/api/interceptor'

export function login(data: unknown) {
  return request.post('/search/hot', data)
}
