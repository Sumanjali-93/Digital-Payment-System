import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import { Search } from 'lucide-react'
import { formatDate, formatCurrency } from '@/utils/helpers'

export default function Activity() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  // Mock data
  const transactions = [
    {
      id: '1',
      date: new Date('2024-01-15'),
      user: 'John Doe',
      category: 'Food & Dining',
      amount: 500,
      balance: 4500,
      status: 'completed',
      type: 'sent',
    },
    {
      id: '2',
      date: new Date('2024-01-14'),
      user: 'Jane Smith',
      category: 'Transfer',
      amount: 1000,
      balance: 5000,
      status: 'completed',
      type: 'received',
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Activity & Transactions</h1>
        <p className="text-muted-foreground">View and manage all your transactions</p>
      </div>

      {/* Balance Summary Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Balance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(5000, 'USD')}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="text-sm font-semibold mt-1">Today at 2:30 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, note..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all" value={selectedType} onValueChange={setSelectedType}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-sm">{formatDate(tx.date)}</TableCell>
                    <TableCell className="text-sm">{tx.user}</TableCell>
                    <TableCell className="text-sm">{tx.category}</TableCell>
                    <TableCell className="text-sm font-semibold">
                      {tx.type === 'sent' ? '-' : '+'}
                      {formatCurrency(tx.amount, 'USD')}
                    </TableCell>
                    <TableCell className="text-sm">{formatCurrency(tx.balance, 'USD')}</TableCell>
                    <TableCell>
                      <Badge variant={tx.status === 'completed' ? 'default' : 'secondary'}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 6-Month Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">6-Month Spending Trend</CardTitle>
          <CardDescription>Sent vs Received comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 gap-2 px-4">
            {[3500, 4200, 3800, 4500, 5000, 4200].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-primary rounded-t"
                  style={{ height: `${(value / 5000) * 100}px` }}
                />
                <span className="text-xs text-muted-foreground mt-2">M{i + 1}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
