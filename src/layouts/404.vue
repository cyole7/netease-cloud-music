<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="y-10" text="center">
    <NResult status="404" title="404" description="生活总归带点荒谬">
      <RouterView />
      <template #footer>
        <NButton @click="router.back()">
          返回
        </NButton>
      </template>
    </NResult>
  </main>
</template>
