import { useState, useEffect } from 'react'
import App from './App'
import LandingPage from './LandingPage'
import Blog from './Blog'

export default function Root() {
  const [route, setRoute] = useState(() => {
    if (window.location.hash === '#dashboard') return 'dashboard'
    if (window.location.hash.startsWith('#blog')) return 'blog'
    return 'landing'
  })

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') setRoute('dashboard')
      else if (window.location.hash.startsWith('#blog')) setRoute('blog')
      else setRoute('landing')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (route === 'dashboard') return <App />
  if (route === 'blog') return <Blog />
  return <LandingPage />
}
