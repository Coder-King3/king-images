import { cn } from '@/utils'

interface ContainerProps {
  children?: React.ReactNode
  className?: React.HTMLAttributes<HTMLDivElement>['className']
  style?: React.CSSProperties
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>['className']
}

function PageContainer({
  children,
  className,
  style,
  wrapperClassName
}: ContainerProps) {
  return (
    <div className={cn('container-wrapper', wrapperClassName)}>
      <div
        className={cn('container mx-auto max-w-full', className)}
        style={style}
      >
        {children}
      </div>
    </div>
  )
}

export default PageContainer
