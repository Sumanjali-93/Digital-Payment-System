import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Wallet } from '@/types'
import { formatCurrency } from '@/utils/helpers'

interface BalanceCardProps {
  wallet: Wallet
}

export default function BalanceCard({ wallet }: BalanceCardProps) {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')

  const displayBalance = currency === 'USD' ? wallet.balanceUSD : wallet.balanceINR

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-semibold opacity-90">Total Balance</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:text-primary-foreground/80"
            onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
          >
            {currency}
          </Button>
        </div>
        
        <div className="mb-4">
          <p className="text-3xl font-bold">{formatCurrency(displayBalance, currency)}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
          <div>
            <p className="text-xs opacity-75">USD Balance</p>
            <p className="text-lg font-semibold">{formatCurrency(wallet.balanceUSD, 'USD')}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">INR Balance</p>
            <p className="text-lg font-semibold">{formatCurrency(wallet.balanceINR, 'INR')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
