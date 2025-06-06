interface UploadProgress {
  /** 当前处理的文件索引 */
  current: number
  /** 当前处理的文件名 */
  currentFileName: string
  /** 失败数量 */
  failed: number
  /** 完成百分比 */
  percent: number
  /** 预估剩余时间 (ms) */
  remainingTime: number
  /** 上传速度 (bytes/s) */
  speed: number
  /** 成功数量 */
  success: number
  /** 总文件数 */
  total: number
}

/** 批量上传结果 */
interface BatchUploadResult {
  /** 失败结果 */
  failed: {
    /** 错误 */
    errorMessage: string
    /** 文件 */
    file: File
  }[]
  /** 失败数量 */
  failedCount: number
  /** 成功结果 */
  success: Image[]
  /** 成功数量 */
  successCount: number
  /** 总文件数 */
  total: number
}

export type { BatchUploadResult, UploadProgress }
