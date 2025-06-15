/** 通用响应结构 */
export interface BaseResponse<T = unknown> {
  code: number
  data?: null | T
  message: string
}
