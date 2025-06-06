/* eslint-disable perfectionist/sort-objects */

import type { RouteObject } from 'react-router'

import { Layout } from '@/layouts'
import { Login, Rendering, Upload, Welcome } from '@/pages'

import { GuardRouter } from './guard'

const LayoutRoute = (children: RouteObject[]) => ({
  path: '/',
  element: (
    <GuardRouter>
      {/* <Suspense> */}
      <Layout />
      {/* </Suspense> */}
    </GuardRouter>
  ),
  children
})
const createRoutes = (children: RouteObject[]) => [
  LayoutRoute(children),
  {
    path: '/rendering',
    element: <Rendering />
  }
]

const routes = createRoutes([
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/upload',
    element: <Upload />
  }
])

export default routes
