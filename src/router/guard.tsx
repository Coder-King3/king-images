import { useUserStore } from '@/store'

import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router'

interface GuardRouteProps {
  children: React.ReactNode
}

const whitelistPaths = ['/', '/login']

const GuardRouter = ({ children }: GuardRouteProps) => {
  const location = useLocation()
  const { loggedIn } = useUserStore()

  /* After RouterGuard */
  useEffect(() => {
    // console.log('After RouterGuard')
  }, [location])

  /* Before RouterGuard */
  // console.log('Before RouterGuard')
  if (!whitelistPaths.includes(location.pathname) && !loggedIn) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export { GuardRouter }
