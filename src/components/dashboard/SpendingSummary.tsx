import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/utils/helpers'

export default function SpendingSummary() {
  // Mock data - will be replaced with real data from API
  const stats = {
    totalSent: 5000,
    totalReceived: 3500,
    netBalance: -1500,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Spending Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-red-100 mb-2">
              <ArrowUpRight className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Sent</p>
            <p className="text-lg font-bold">{formatCurrency(stats.totalSent, 'USD')}</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-green-100 mb-2">
              <ArrowDownLeft className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Received</p>
            <p className="text-lg font-bold">{formatCurrency(stats.totalReceived, 'USD')}</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-blue-100 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">Net</p>
            <p className="text-lg font-bold">{formatCurrency(stats.netBalance, 'USD')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
