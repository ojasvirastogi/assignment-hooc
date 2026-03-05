"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  invoiceId: string
  onSuccess: () => void
}

export function PaymentModal({ isOpen, onClose, amount, invoiceId, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate gateway API call with 2 seconds delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)
    
    // Auto-close and trigger success after 1.5 seconds
    setTimeout(() => {
      onSuccess()
      onClose()
      setIsSuccess(false) // Reset for future
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-xl">Payment Successful!</DialogTitle>
            <DialogDescription>
              Thank you for your business. Your payment for invoice #{invoiceId} has been securely processed.
            </DialogDescription>
          </div>
        ) : (
          <>
            <div className="bg-slate-50 p-6 border-b text-center">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Amount Due</span>
              <div className="text-4xl font-bold text-slate-900 mt-2">{formatCurrency(amount)}</div>
              <p className="text-sm text-slate-500 mt-1">Invoice #{invoiceId}</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base font-semibold bg-gray-900 hover:bg-gray-800"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <CreditCard className="mr-2 h-5 w-5" />
                  )}
                  {isProcessing ? "Processing..." : "Pay with Card"}
                </Button>
                <p className="text-xs text-center text-slate-400">
                  Payments are secure and encrypted.
                </p>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
