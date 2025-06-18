import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

/**
 * 判断当前设备是否为移动端的Hook
 * @param mobileWidth 定义移动设备的最大宽度，默认为768px
 * @param debounceTime 防抖延迟时间，默认为150ms
 * @returns 当设备宽度小于等于指定宽度时返回true，否则返回false
 */
const useIsMobile = (mobileWidth: number = 768, debounceTime: number = 150) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)

  // 使用useDebounce处理窗口大小变化
  useDebounce(
    () => {
      setIsMobile(windowWidth <= mobileWidth)
    },
    debounceTime,
    [windowWidth, mobileWidth]
  )

  useEffect(() => {
    // 初始检查
    setIsMobile(window.innerWidth <= mobileWidth)

    // 窗口大小变化处理函数
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)

    // 清理监听器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileWidth])

  return isMobile
}

export { useIsMobile }
