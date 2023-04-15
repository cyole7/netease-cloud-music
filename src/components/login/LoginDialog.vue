<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

const loading = ref(false)
const qrCodeImg = ref('')

onMounted(async () => {
  try {
    loading.value = true

    const { data } = await getQrKey()
    const qrCodeRes = await createQrCode({ key: data.unikey, qrimg: 1 })

    qrCodeImg.value = qrCodeRes.data.qrimg
  }
  catch (err) {
    console.error(err)
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <NCard w-87 h-120>
    <div h-full flex="~ col center" gap-4>
      <div text-2xl>
        扫码登录
      </div>
      <div w-46 h-46>
        <NSkeleton v-if="loading" w-full h-full />
        <img v-else w-full :src="qrCodeImg" alt="qrcode">
      </div>
      <div>使用<a text-theme href="https://music.163.com/#/download" target="_blank">网易云音乐</a>扫码登录</div>
    </div>
  </NCard>
</template>
