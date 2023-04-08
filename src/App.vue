<script setup lang="ts">
import { darkTheme } from 'naive-ui'
</script>

<template>
  <NConfigProvider h-full :theme="isDark ? darkTheme : null">
    <RouterView />
    <NGlobalStyle />
  </NConfigProvider>
</template>
