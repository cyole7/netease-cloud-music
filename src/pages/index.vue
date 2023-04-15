<script setup lang="ts">
function login() {
  isLoginDialogOpen.value = true
}
</script>

<template>
  <div>
    首页
    <NButton @click="login">
      登录
    </NButton>
  </div>
</template>
