import { cn } from '@/utils'

interface LogoProps {
  className?: string
  fillColor?: string
  size?: number | string
  strokeColor?: string
}

function Logo({
  className = '',
  fillColor = '#2F88FF',
  size = 24,
  strokeColor = 'currentColor'
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="2"
      stroke={strokeColor}
      className={cn('king-icon', className)}
      style={{
        height: size,
        minHeight: size,
        minWidth: size,
        width: size
      }}
    >
      <g clipPath="url(#clip0_24_22)">
        <path
          d="M7.43671 12.0633L2.52929 16.9707C2.51054 16.9895 2.5 17.0149 2.5 17.0414V19.9C2.5 19.9552 2.54477 20 2.6 20H21.4C21.4552 20 21.5 19.9552 21.5 19.9V17.0494C21.5 17.0183 21.4855 16.9889 21.4607 16.97L13.0751 10.5574C13.033 10.5252 12.973 10.5315 12.9385 10.5718L10.0629 13.9266C10.0278 13.9675 9.96661 13.9733 9.92452 13.9396L7.56989 12.0559C7.5301 12.0241 7.47274 12.0273 7.43671 12.0633Z"
          fill={fillColor}
        />
      </g>
      <path d="M6.5 8.25C6.5 8.66421 6.83579 9 7.25 9C7.66421 9 8 8.66421 8 8.25C8 7.83579 7.66421 7.5 7.25 7.5C6.83579 7.5 6.5 7.83579 6.5 8.25Z" />
      <path d="M21.5 5.2V18.8C21.5 19.4627 20.9627 20 20.3 20H3.7C3.03726 20 2.5 19.4627 2.5 18.8V5.2C2.5 4.53726 3.03726 4 3.7 4H20.3C20.9627 4 21.5 4.53726 21.5 5.2Z" />
      <defs>
        <clipPath id="clip0_24_22">
          <rect
            width="20"
            height="11"
            fill="white"
            transform="translate(2 9)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export { Logo }
