/** 通用响应结构 */
export interface BaseResponse<T = unknown> {
  code: number
  data?: T
  message: string
}
