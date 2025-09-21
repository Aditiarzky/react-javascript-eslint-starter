import { createRouter, createRoute } from '@tanstack/react-router'
import { lazy } from 'react'
import { rootRoute } from './route'
import * as PATH from './constants'

const Home = lazy(() => import('../pages/Home'))
const NotFounded = lazy(() => import('../pages/NotFound'))

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: PATH.HOME_PAGE,
  component: Home,
})

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFounded,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  notFoundRoute,
])

export const router = createRouter({ 
    routeTree,
    defaultNotFoundComponent: NotFounded,
})