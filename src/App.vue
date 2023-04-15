<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import { darkThemeOverrides, themeOverrides } from './constants'
</script>

<template>
  <NConfigProvider
    h-full
    :theme="isDark ? darkTheme : null"
    :theme-overrides="isDark ? darkThemeOverrides : themeOverrides"
  >
    <RouterView />
    <NGlobalStyle />
    <ModalContainer />
  </NConfigProvider>
</template>
