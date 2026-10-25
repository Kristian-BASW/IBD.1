import { defineRoutesSetup } from '@slidev/types'

// This is deliberately different from the unpublished course overview URL.
export const SLIDEV_OVERVIEW_GUID = '15f731f5-700e-4028-9ad0-d1743fb1cdcd'

export default defineRoutesSetup((routes) => {
  const overviewRoute = routes.find(route => route.name === 'overview')
  const playRoute = routes.find(route => route.name === 'play')

  if (playRoute)
    playRoute.path = '/:no/:exerciseId?'

  if (!overviewRoute)
    return routes

  overviewRoute.path = `/${SLIDEV_OVERVIEW_GUID}`

  return routes
})
