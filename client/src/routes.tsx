import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FixturesPage } from './pages/FixturesPage'
import { FollowingPage } from './pages/FollowingPage'
import { HomePage } from './pages/HomePage'
import { LivePage } from './pages/LivePage'
import { MatchPage } from './pages/MatchPage'
import { NewsPage } from './pages/NewsPage'
import { PersonalizedHomePage } from './pages/PersonalizedHomePage'

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personalized" element={<PersonalizedHomePage />} />
        <Route path="/following" element={<FollowingPage />} />
        <Route path="/matches" element={<MatchPage />} />
        <Route path="/matches/:id" element={<MatchPage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/fixtures" element={<FixturesPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
