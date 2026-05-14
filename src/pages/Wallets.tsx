import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { CreditCard, Trash2, Star, Plus } from 'lucide-react'

export default function Wallets() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      cardLast4: '4242',
      cardExpiry: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'bank',
      bankName: 'Chase Bank',
      accountLast4: '5678',
      isDefault: false,
    },
  ])

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(m => m.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(m => ({
      ...m,
      isDefault: m.id === id
    })))
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Wallet Management</h1>
        <p className="text-muted-foreground">Manage your payment methods</p>
      </div>

      {/* Add Payment Method */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>Add a new card or bank account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <Button className="w-full">Add Payment Method</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {method.type === 'card' ? `Credit Card ••${method.cardLast4}` : `${method.bankName} ••${method.accountLast4}`}
                    </p>
                    {method.type === 'card' && (
                      <p className="text-sm text-muted-foreground">Expires {method.cardExpiry}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <Badge variant="default" className="text-xs">Default</Badge>
                  )}
                  {!method.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(method.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
