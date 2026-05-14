import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { TRANSACTION_CATEGORIES } from '@/constants'
import { formatCurrency } from '@/utils/helpers'
import { Send } from 'lucide-react'

const sendMoneySchema = z.object({
  recipientEmail: z.string().email('Invalid email'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.enum(['USD', 'INR']),
  category: z.string(),
  note: z.string().optional(),
})

type SendMoneyForm = z.infer<typeof sendMoneySchema>

export default function SendMoney() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SendMoneyForm>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      currency: 'USD',
    },
  })

  const amount = watch('amount')
  const currency = watch('currency')

  const onSubmit = (data: SendMoneyForm) => {
    console.log('Sending money:', data)
    // Call API to send money
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Send Money</h1>
        <p className="text-muted-foreground">Transfer funds to another user</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="recipient">Recipient Email</Label>
                  <Input
                    id="recipient"
                    placeholder="recipient@example.com"
                    {...register('recipientEmail')}
                  />
                  {errors.recipientEmail && (
                    <p className="text-sm text-destructive mt-1">{errors.recipientEmail.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    {...register('amount', { valueAsNumber: true })}
                  />
                  {errors.amount && (
                    <p className="text-sm text-destructive mt-1">{errors.amount.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    {...register('currency')}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>

                <Button onClick={() => setStep(2)} className="w-full">
                  Next
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-input rounded-md"
                    {...register('category')}
                  >
                    <option value="">Select a category</option>
                    {TRANSACTION_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Input
                    id="note"
                    placeholder="Add a note..."
                    {...register('note')}
                  />
                </div>

                {/* Summary */}
                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold">{formatCurrency(amount || 0, currency as any)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>{formatCurrency(amount || 0, currency as any)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
