import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Activity from './pages/Activity'
import Analytics from './pages/Analytics'
import Wallets from './pages/Wallets'
import Profile from './pages/Profile'
import SendMoney from './pages/SendMoney'
import RequestMoney from './pages/RequestMoney'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/send" element={<SendMoney />} />
            <Route path="/request" element={<RequestMoney />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
