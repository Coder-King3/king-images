import { useEffect, useRef } from 'react'

/**
 * 自定义Hook，使鼠标滚轮在容器中实现水平滚动
 * @param options 可选配置项
 * @returns [scrollRef]
 */
export function useHorizontalScroll<T extends HTMLElement>(
  options: {
    enabled?: boolean
    multiplier?: number
    smooth?: boolean
  } = {}
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

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false })

    if (smooth) {
      scrollContainer.style.scrollBehavior = 'smooth'
    }

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel)
      if (smooth) {
        scrollContainer.style.scrollBehavior = ''
      }
    }
  }, [scrollRef, enabled, smooth, multiplier])

  return [scrollRef]
}
