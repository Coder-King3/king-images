import { Container } from '@/components'
import { useIsTop } from '@/hooks'

import Logo from './Logo'
import UserDropdown from './UserDropdown'

interface HeaderProps {
  height: number
}

export const Header = ({ height }: HeaderProps) => {
  const isTop = useIsTop()

  return (
    <header
      className={`${
        isTop
          ? 'bg-transparent'
          : 'bg-background/95 supports-[backdrop-filter]:bg-background/60'
      } sticky top-0 z-50 w-full border-b-[0.8px] backdrop-blur transition-all duration-200 select-none ${
        isTop ? 'border-transparent' : 'border-gray-200 dark:border-gray-800'
      } w-full`}
    >
      <Container
        className="flex items-center justify-between xl:px-6"
        style={{ height: `${height}px` }}
      >
        <Logo />

        <div className="flex items-center gap-2">
          <UserDropdown></UserDropdown>
        </div>
      </Container>
    </header>
  )
}

export default Header
