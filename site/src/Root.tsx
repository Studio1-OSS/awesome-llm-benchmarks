import { useState, useEffect } from 'react'
import App from './App'
import LandingPage from './LandingPage'
import Blog from './Blog'
import NotFound from './NotFound'

export default function Root() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash === '' || hash === '#') return 'landing'
    if (hash === '#dashboard') return 'dashboard'
    if (hash.startsWith('#blog')) return 'blog'
    return '404'
  })

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '' || hash === '#') setRoute('landing')
      else if (hash === '#dashboard') setRoute('dashboard')
      else if (hash.startsWith('#blog')) setRoute('blog')
      else setRoute('404')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (route === 'dashboard') return <App />
  if (route === 'blog') return <Blog />
  if (route === '404') return <NotFound />
  return <LandingPage />
}
