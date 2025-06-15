import type { BaseResponse } from '../types'

import { alova } from '@/utils'

import { API } from '../config'

export namespace UserApi {
  /** 用户空间信息数据 */
  export interface SpaceInfoData {
    face: string
    mid: number
    name: string
    sign: string
  }

  /** 获取用户信息返回值 */
  export type SpaceInfoResult = BaseResponse<SpaceInfoData>

  /** 二维码生成数据 */
  export interface QrcodeGenerateData {
    qrcode_key: string
    url: string
  }

  /** 二维码生成返回值 */
  export type QrcodeGenerateResult = BaseResponse<QrcodeGenerateData>

  /** 二维码轮询数据 */
  export interface QrcodePollData {
    code: number
    message: string
    refresh_token: string
    timestamp: number
    url: string
  }

  /** 二维码轮询返回值 */
  export type QrcodePollResult = BaseResponse<QrcodePollData>
}

/**
 * 获取用户个人空间信息
 * 需要携带 cookies 来获取登录用户信息
 */
const getSpaceInfo = async () => {
  // 使用alova发送请求
  return alova.Get<UserApi.SpaceInfoResult>(API.USER_INFO, {
    withCredentials: true // 携带跨域Cookie
  })
}

/**
 * 生成二维码
 */
const generateQrcode = async () => {
  return alova.Get<UserApi.QrcodeGenerateResult>(API.QRCODE_GENERATE)
}

/**
 * 轮询二维码状态
 * @param qrcode_key 二维码key
 */
const pollQrcode = async (qrcode_key: string) => {
  return alova.Get<UserApi.QrcodePollResult>(API.QRCODE_POLL, {
    params: { qrcode_key }
  })
}

export { generateQrcode, getSpaceInfo, pollQrcode }
