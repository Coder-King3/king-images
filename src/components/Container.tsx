import { cn } from '@/utils'

interface ContainerProps {
  children?: React.ReactNode
  className?: React.HTMLAttributes<HTMLDivElement>['className']
  style?: React.CSSProperties
}

function PageContainer({ children, className, style }: ContainerProps) {
  return (
    <div
      className={cn('container mx-auto max-w-full', className)}
      style={style}
    >
      {children}
    </div>
  )
}

export default PageContainer
