import { useMemo } from 'react'
import { useWindowScroll } from 'react-use'

export const useIsTop = (threshold = 30) => {
  // 使用react-use提供的useWindowScroll监听窗口滚动
  const { y } = useWindowScroll()

  // 使用useMemo避免不必要的重新计算
  const isTop = useMemo(() => {
    return (y ?? 0) < threshold
  }, [y, threshold])

  return isTop
}
