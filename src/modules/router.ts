import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import type { UserModule } from '~/types'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export const install: UserModule = (app) => {
  app.use(router)
}

router.beforeEach(() => {
  loadingBar.start()
})

router.afterEach(() => {
  loadingBar.finish()
})

router.onError(() => {
  loadingBar.error()
})
