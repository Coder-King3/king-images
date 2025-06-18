import { useCallback, useMemo, useRef, useState } from 'react'

interface HoverOpenOptions {
  closeDelay?: number
  openDelay?: number
}

export function useHoverOpen(options?: HoverOpenOptions) {
  const { closeDelay = 50, openDelay = 100 } = options || {}
  const [open, setOpen] = useState(false)
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    // 清除关闭定时器
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }

    // 如果已经打开或者没有开启延迟，直接设置为打开状态
    if (open || openDelay === 0) {
      setOpen(true)
      return
    }

    // 设置打开延迟
    openTimeoutRef.current = setTimeout(() => {
      setOpen(true)
      openTimeoutRef.current = null
    }, openDelay)
  }, [open, openDelay])

  const handleMouseLeave = useCallback(() => {
    // 清除打开定时器
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }

    // 设置关闭延迟
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false)
      closeTimeoutRef.current = null
    }, closeDelay)
  }, [closeDelay])

  // 手动关闭方法
  const handleClose = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpen(false)
  }, [])

  const hoverProps = useMemo(
    () => ({
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }),
    [handleMouseEnter, handleMouseLeave]
  )

  return {
    close: handleClose,
    hoverProps,
    open,
    setOpen
  }
}
