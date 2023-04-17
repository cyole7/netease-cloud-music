<script setup lang="ts">
import { isLoginDialogOpen } from '~/composables/dialog'
</script>

<template>
  <!-- 登录弹窗 -->
  <NModal v-model:show="isLoginDialogOpen">
    <LoginDialog />
  </NModal>
</template>
