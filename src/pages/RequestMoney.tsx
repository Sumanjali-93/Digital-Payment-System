import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { ArrowDownLeft } from 'lucide-react'

const requestMoneySchema = z.object({
  payerEmail: z.string().email('Invalid email'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.enum(['USD', 'INR']),
  dueDate: z.string().optional(),
  note: z.string().optional(),
})

type RequestMoneyForm = z.infer<typeof requestMoneySchema>

export default function RequestMoney() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RequestMoneyForm>({
    resolver: zodResolver(requestMoneySchema),
    defaultValues: {
      currency: 'USD',
    },
  })


  const onSubmit = (data: RequestMoneyForm) => {
    console.log('Requesting money:', data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 3000)
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-6 p-4">
        <div className="pt-4">
          <h1 className="text-2xl font-bold">Request Money</h1>
        </div>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-green-100">
                <ArrowDownLeft className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-green-900 mb-2">Request Sent!</h2>
            <p className="text-green-700">Your money request has been sent successfully.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="pt-4">
        <h1 className="text-2xl font-bold">Request Money</h1>
        <p className="text-muted-foreground">Request money from another user</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="payer">Payer Email</Label>
              <Input
                id="payer"
                placeholder="payer@example.com"
                {...register('payerEmail')}
              />
              {errors.payerEmail && (
                <p className="text-sm text-destructive mt-1">{errors.payerEmail.message}</p>
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

            <div>
              <Label htmlFor="dueDate">Due Date (Optional)</Label>
              <Input
                id="dueDate"
                type="date"
                {...register('dueDate')}
              />
            </div>

            <div>
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                placeholder="Add a note..."
                {...register('note')}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              <ArrowDownLeft className="h-4 w-4 mr-2" />
              Send Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
