import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
}
