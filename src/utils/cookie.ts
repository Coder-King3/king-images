import jsCookie from 'js-cookie'

interface CookieOptions {
  domain?: string
  expires?: Date | number
  path?: string
  sameSite?: 'lax' | 'none' | 'strict'
  secure?: boolean
}

/**
 * 设置cookie
 * @param name cookie名称
 * @param value cookie值
 * @param options 配置选项
 */
export const setCookie = (
  name: string,
  value: string,
  options?: CookieOptions
): void => {
  jsCookie.set(name, value, options)
}

/**
 * 获取cookie
 * @param name cookie名称
 * @returns cookie值，不存在则返回undefined
 */
export const getCookie = (name: string): string | undefined => {
  return jsCookie.get(name)
}

/**
 * 删除cookie
 * @param name cookie名称
 * @param options 配置选项
 */
export const removeCookie = (name: string, options?: CookieOptions): void => {
  jsCookie.remove(name, options)
}

/**
 * 检查cookie是否存在
 * @param name cookie名称
 * @returns 存在返回true，否则返回false
 */
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== undefined
}

/**
 * 获取所有cookie
 * @returns 所有cookie的对象
 */
export const getAllCookies = (): Record<string, string> => {
  return jsCookie.get()
}

/**
 * 设置JSON对象到cookie
 * @param name cookie名称
 * @param value JSON对象
 * @param options 配置选项
 */
export const setJSONCookie = <T>(
  name: string,
  value: T,
  options?: CookieOptions
): void => {
  const jsonValue = JSON.stringify(value)
  setCookie(name, jsonValue, options)
}

/**
 * 获取cookie并解析为JSON对象
 * @param name cookie名称
 * @returns 解析后的JSON对象，解析失败或不存在则返回null
 */
export const getJSONCookie = <T>(name: string): null | T => {
  const value = getCookie(name)
  if (!value) return null

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error(`Failed to parse cookie ${name} as JSON:`, error)
    return null
  }
}

/**
 * 清除所有cookie
 * @param options 配置选项
 */
export const clearAllCookies = (options?: CookieOptions): void => {
  const cookies = getAllCookies()
  Object.keys(cookies).forEach((name) => {
    removeCookie(name, options)
  })
}

export default {
  clearAll: clearAllCookies,
  get: getCookie,
  getAll: getAllCookies,
  getJSON: getJSONCookie,
  has: hasCookie,
  remove: removeCookie,
  set: setCookie,
  setJSON: setJSONCookie
}
