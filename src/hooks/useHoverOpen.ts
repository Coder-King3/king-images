import { useCallback, useMemo, useRef, useState } from 'react'

export function useHoverOpen(delay = 100) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, delay)
  }, [delay])

  const hoverProps = useMemo(
    () => ({
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }),
    [handleMouseEnter, handleMouseLeave]
  )

  return {
    hoverProps,
    open,
    setOpen
  }
}
