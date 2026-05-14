import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Analytics() {
  const monthlyData = [
    { month: 'Jan', sent: 2400, received: 2400 },
    { month: 'Feb', sent: 3000, received: 1398 },
    { month: 'Mar', sent: 2000, received: 9800 },
    { month: 'Apr', sent: 2780, received: 3908 },
    { month: 'May', sent: 1890, received: 4800 },
    { month: 'Jun', sent: 2390, received: 3800 },
  ]

  const categoryData = [
    { name: 'Food & Dining', value: 2500 },
    { name: 'Shopping', value: 1800 },
    { name: 'Transport', value: 1200 },
    { name: 'Entertainment', value: 1000 },
    { name: 'Other', value: 900 },
  ]

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Analytics & Insights</h1>
        <p className="text-muted-foreground">Understand your spending patterns</p>
      </div>

      {/* Monthly Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Comparison</CardTitle>
          <CardDescription>Sent vs Received transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" fill="#ef4444" />
              <Bar dataKey="received" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Spending by Category</CardTitle>
          <CardDescription>How you spend your money</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$7,890</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$234</p>
            <p className="text-xs text-muted-foreground">Per transaction</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
