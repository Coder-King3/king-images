import { Toaster } from '@/components/ui'

import { Outlet } from 'react-router'

import layoutConfig from './config'
import Content from './Content'
import Footer from './Footer'
import { Header } from './header'

export const Layout = () => {
  const { header } = layoutConfig

  return (
    <div className="relative flex min-h-screen w-full flex-col transition-all ease-in">
      <Header height={header.height} />

      <Content>
        <Outlet></Outlet>
      </Content>

      <Footer />

      {/* 提示组件 */}
      <Toaster position="top-right" richColors />
    </div>
  )
}

export default Layout
