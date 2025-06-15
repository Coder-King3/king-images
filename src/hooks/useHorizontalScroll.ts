import { useEffect, useRef } from 'react'

interface UseHorizontalScrollOptions {
  /** 是否启用滚动 */
  enabled?: boolean
  /** 滚动速度 */
  multiplier?: number
  /** 是否启用平滑滚动 */
  smooth?: boolean
}

/**
 * 自定义Hook，使鼠标滚轮在容器中实现水平滚动
 * @param options 可选配置项
 * @returns [scrollRef]
 */
export function useHorizontalScroll<T extends HTMLElement>(
  options: UseHorizontalScrollOptions = {}
) {
  const { enabled = true, multiplier = 1, smooth = true } = options

  const scrollRef = useRef<T>(null)

  useEffect(() => {
    const scrollContainer = scrollRef?.current
    if (!scrollContainer || !enabled) return

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault()
        scrollContainer.scrollLeft += e.deltaY * multiplier
      }
    }

    // 设置 { passive: false } 禁用浏览器默认的被动事件监听，允许通过 preventDefault() 阻止垂直滚动，实现纯水平滚动效果
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })
    if (smooth) scrollContainer.style.scrollBehavior = 'smooth'

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
      if (smooth) scrollContainer.style.scrollBehavior = ''
    }
  }, [scrollRef, enabled, smooth, multiplier])

  return [scrollRef]
}
