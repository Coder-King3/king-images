import { cn } from '@/utils'

interface ContainerProps {
  children?: React.ReactNode
  className?: React.HTMLAttributes<HTMLDivElement>['className']
  style?: React.CSSProperties
}

function Container({ children, className, style }: ContainerProps) {
  return (
    <div className="container-wrapper mx-auto max-w-[1400px]">
      <div
        className={cn('container mx-auto max-w-[1536px] px-4', className)}
        style={style}
      >
        {children}
      </div>
    </div>
  )
}

export default Container
