import { createDiscreteApi } from 'naive-ui'
import { darkThemeOverrides, themeOverrides } from '~/constants'

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: {
      themeOverrides: isDark.value ? darkThemeOverrides : themeOverrides,
    },
  },
)

export {
  message as NMessage,
  notification as NNotification,
  dialog as NDialog,
  loadingBar as NLoadingBar,
}
