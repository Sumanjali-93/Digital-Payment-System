import { useWallet } from '@/hooks/useData'
import BalanceCard from '@/components/dashboard/BalanceCard'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentActivity from '@/components/dashboard/RecentActivity'
import SpendingSummary from '@/components/dashboard/SpendingSummary'

export default function Dashboard() {
  const { data: wallet } = useWallet('user@example.com')

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Greeting */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Welcome back! 👋</h1>
        <p className="text-muted-foreground">Manage your finances on the go</p>
      </div>

      {/* Balance Card */}
      {wallet && <BalanceCard wallet={wallet} />}

      {/* Quick Actions */}
      <QuickActions />

      {/* Spending Summary */}
      <SpendingSummary />

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  )
}
