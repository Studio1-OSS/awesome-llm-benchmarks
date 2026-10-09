import { useState, useEffect } from 'react'
import App from './App'
import LandingPage from './LandingPage'

export default function Root() {
  const [route, setRoute] = useState(() => {
    return window.location.hash === '#dashboard' ? 'dashboard' : 'landing'
  })

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash === '#dashboard' ? 'dashboard' : 'landing')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return route === 'dashboard' ? <App /> : <LandingPage />
}
