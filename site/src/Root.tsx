import { Routes, Route } from 'react-router-dom'
import App from './App'
import LandingPage from './LandingPage'
import Blog from './Blog'
import NotFound from './NotFound'

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/blog/*" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
