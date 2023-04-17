<script setup lang="ts">
import { ResultCode } from '~/constants'

const loading = ref(false)
const qrCodeImg = ref('')
const statusCode = ref(0)
let pause = () => {}

const { AUTHORIZED_LOGIN_SUCCESS, QR_CODE_EXPIRED, WAITING_FOR_CONFIRM } = ResultCode

const controller = new AbortController()

async function handleLogin() {
  try {
    loading.value = true

    const axiosConfig = { signal: controller.signal, noCache: true }

    const { data: { unikey } } = await getQrKey(axiosConfig)
    const { data: { qrimg } } = await createQrCode({ key: unikey, qrimg: true }, axiosConfig)

    qrCodeImg.value = qrimg

    pause = useIntervalFn(async () => {
      const { code, cookie } = await checkQrCode({ key: unikey }, axiosConfig)

      statusCode.value = code

      if (code === AUTHORIZED_LOGIN_SUCCESS)
        handleLoginSuccess(cookie)
    }, 1000).pause
  }
  catch (err) {
    console.error(err)
  }
  finally {
    loading.value = false
  }
}

function handleLoginSuccess(cookie: string) {
  pause()

  setUserCookie(cookie)
  NMessage.success('登录成功')

  isLoginDialogOpen.value = false
}

watchEffect(() => {
  if (!isLoginDialogOpen.value)
    controller.abort()
})

onMounted(() => {
  handleLogin()
})

onBeforeUnmount(() => {
  pause()
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
        <!-- TODO: 已扫描、二维码过期后的处理 -->
        <div>
          <div v-if="statusCode === QR_CODE_EXPIRED">
            800: 已失效
          </div>
          <div v-if="statusCode === WAITING_FOR_CONFIRM">
            802: 已扫描
          </div>
        </div>
        <div />
      </div>
      <div>使用<a text-theme href="https://music.163.com/#/download" target="_blank">网易云音乐</a>扫码登录</div>
    </div>
  </NCard>
</template>
