import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatCurrency } from '@/utils/helpers'
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'

export default function RecentActivity() {
  // Mock data - will be replaced with real data from API
  const transactions = [
    {
      id: '1',
      recipient: 'John Doe',
      type: 'sent',
      amount: 500,
      date: new Date(),
      status: 'completed',
    },
    {
      id: '2',
      recipient: 'Jane Smith',
      type: 'received',
      amount: 250,
      date: new Date(),
      status: 'completed',
    },
    {
      id: '3',
      recipient: 'Bob Johnson',
      type: 'sent',
      amount: 1000,
      date: new Date(),
      status: 'pending',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between pb-4 border-b last:pb-0 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${transaction.type === 'sent' ? 'bg-red-100' : 'bg-green-100'}`}>
                  {transaction.type === 'sent' ? (
                    <ArrowUpRight className={`h-4 w-4 ${transaction.type === 'sent' ? 'text-red-600' : ''}`} />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm">{transaction.recipient}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`}>
                  {transaction.type === 'sent' ? '-' : '+'}
                  {formatCurrency(transaction.amount, 'USD')}
                </p>
                <Badge
                  variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs mt-1"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
