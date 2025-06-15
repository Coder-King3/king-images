import type { BaseResponse } from '../types'

import { alova } from '@/utils'

import { API } from '../config'

export namespace UploadApi {
  /** 上传图片返回值 */
  export interface UploadImageData {
    etag: string
    location: string
  }

  export type UploadImageResult = BaseResponse<UploadImageData>
}

/**
 * 上传图片到哔哩哔哩图床
 */
const uploadImage = (formData: FormData) => {
  return alova.Post<UploadApi.UploadImageResult>(API.UPLOAD_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export { uploadImage }
