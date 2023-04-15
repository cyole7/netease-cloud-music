<script setup lang="ts">
const qrCodeImg = ref('')

onMounted(async () => {
  const { data } = await getQrKey()
  const qrCodeRes = await createQrCode({ key: data.unikey, qrimg: 1 })

  qrCodeImg.value = qrCodeRes.data.qrimg
})
</script>

<template>
  <div>
    <img :src="qrCodeImg" alt="qrcode">
  </div>
</template>
