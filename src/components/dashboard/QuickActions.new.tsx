import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { Send, ArrowDownLeft, Plus } from 'lucide-react'

export default function QuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Link to="/send">
        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
          <Send className="h-5 w-5" />
          <span className="text-xs">Send</span>
        </Button>
      </Link>
      
      <Link to="/request">
        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
          <ArrowDownLeft className="h-5 w-5" />
          <span className="text-xs">Request</span>
        </Button>
      </Link>
      
      <Link to="/wallets">
        <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center gap-2">
          <Plus className="h-5 w-5" />
          <span className="text-xs">Add Money</span>
        </Button>
      </Link>
    </div>
  )
}
