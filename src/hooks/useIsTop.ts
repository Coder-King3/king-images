import { useScroll } from 'ahooks'
import { useMemo } from 'react'

export const useIsTop = () => {
  const scroll = useScroll()

  // 使用 useMemo 记忆化计算结果，避免不必要的重渲染
  const isTop = useMemo(() => {
    // 添加空值检查，确保 scroll 和 scroll.top 都存在
    return (scroll?.top ?? 0) < 30
  }, [scroll?.top])

  return isTop
}
