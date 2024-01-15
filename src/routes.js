import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const detail = React.lazy(() => import('./views/theme/detail/Detail'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))

//Forms
const Select = React.lazy(() => import('./views/forms/select/Select'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/detail', name: 'Detail', element: detail },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
