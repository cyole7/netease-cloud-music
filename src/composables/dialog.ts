export const isLoginDialogOpen = ref(false)

export function openLoginDialog() {
  isLoginDialogOpen.value = true
}
