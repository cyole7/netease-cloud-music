<script setup lang="ts">
function login() {
  isLoginDialogOpen.value = true
}
</script>

<template>
  <div>
    首页
    <NButton test-a="1" @click="login">
      登录
    </NButton>
    <NButton @click="logout">
      退出
    </NButton>
  </div>
</template>
