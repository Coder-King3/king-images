import { REQUEST_API_URL, REQUEST_PASSPORT_URL } from '@/constants'

const API = {
  // 直接调用哔哩哔哩接口
  QRCODE_GENERATE: `${REQUEST_PASSPORT_URL}/x/passport-login/web/qrcode/generate`,
  QRCODE_POLL: `${REQUEST_PASSPORT_URL}/x/passport-login/web/qrcode/poll`,
  // 使用 nitro 服务转发
  UPLOAD_IMAGE: `${REQUEST_API_URL}/upload`,
  USER_INFO: `${REQUEST_API_URL}/myinfo`
}

export { API }
