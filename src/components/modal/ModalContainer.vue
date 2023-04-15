<script setup lang="ts">
import { isLoginDialogOpen } from '~/composables/modal'
</script>

<template>
  <!-- 登录弹窗 -->
  <NModal
    v-model:show="isLoginDialogOpen"
  >
    <LoginDialog />
  </NModal>
</template>
