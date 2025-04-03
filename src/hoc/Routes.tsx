import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Login } from '../pages/auth/Login'
import { isTokenValid } from './AuthContext'
import { getCookie } from '../utils/cookies'
import { Profile } from '../pages/profile'

const routes = [
  { route: 'profile', component: Profile, protect: true, type: 'private' },
  { route: '/signin', component: Login, protect: false, type: 'public' },
]

function Protecting({ component: Component, protect }: any) {
  const location = useLocation()
  const auth: any = isTokenValid(getCookie('_a_tc') as string)

  const previousPath = sessionStorage.getItem('previousPath') || null

  if (!protect && auth) {
    return <Navigate to={previousPath || '/profile'} replace />
  }

  if (protect && !auth) {
    return <Navigate to={'/signin'} replace />
  }

  if (protect) {
    sessionStorage.setItem('previousPath', location.pathname)
  }

  return <Component />
}

function ProtectedRoute() {
  const auth: any = isTokenValid(getCookie('_a_tc') as string)

  return (
    <Routes>
      {routes.map(({ route, component, protect }, index) => (
        <Route key={index} path={route} element={<Protecting component={component} protect={protect} />} />
      ))}
      <Route path="*" element={<Navigate to={!auth ? 'signin' : '/profile'} />} />
    </Routes>
  )
}

export default function AppRoute() {
  return (
    <BrowserRouter>
      <ProtectedRoute />
    </BrowserRouter>
  )
}
