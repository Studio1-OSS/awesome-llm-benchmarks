import { Routes, Route } from 'react-router-dom'
import App from './App'
import LlmRace from './LlmRace'
import LandingPage from './LandingPage'
import Blog from './Blog'
import NotFound from './NotFound'
import ContentPage from './ContentPage'

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/llm-race" element={<LlmRace />} />
      <Route path="/blog/*" element={<Blog />} />
      <Route path="/methodologies" element={<ContentPage />} />
      <Route path="/about" element={<ContentPage />} />
      <Route path="/contributors" element={<ContentPage />} />
      <Route path="/documentation" element={<ContentPage />} />
      <Route path="/updates" element={<ContentPage />} />
      <Route path="/faq" element={<ContentPage />} />
      <Route path="/privacy" element={<ContentPage />} />
      <Route path="/terms" element={<ContentPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
