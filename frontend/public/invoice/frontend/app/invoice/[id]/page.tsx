"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Printer, CreditCard, Loader2 } from "lucide-react"
import toast from "react-hot-toast"

// Mock data
const INITIAL_INVOICE = {
  id: "INV-2026-00124",
  status: "Unpaid", // Unpaid, Paid, Overdue
  issueDate: "Oct 24, 2026",
  dueDate: "Nov 07, 2026",
  amountDue: 4500.00,
  client: {
    name: "Acme Corp",
    email: "billing@acmecorp.com",
    address: "123 Business Rd, Tech City, TC 90210",
  },
  company: {
    name: "InvoiceSystem Inc.",
    email: "hello@invoicesystem.com",
    address: "456 Startup Blvd, Suite 100, Innovation City, IC 10001",
    taxId: "GST-987654321",
  },
  items: [
    { title: "Web Application Development", quantity: 1, price: 3000, total: 3000 },
    { title: "UI/UX Design", quantity: 1, price: 1000, total: 1000 },
    { title: "Cloud Hosting (1 Year)", quantity: 1, price: 500, total: 500 },
  ],
  subtotal: 4500,
  tax: 0,
  total: 4500,
}

export default function PublicInvoicePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  // Ensure we stringify id properly if it's an array
  const idStr = Array.isArray(params?.id) ? params?.id[0] : params?.id || ""

  const [invoice, setInvoice] = useState<any>(INITIAL_INVOICE)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isPaying, setIsPaying] = useState(false)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    try {
      setIsPaying(true)
      
      // 1. Load Razorpay script
      const res = await loadRazorpayScript()
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?")
        return
      }

      // 2. Create order on backend
      const orderData = await api.createPaymentOrder(idStr)
      if (!orderData.success) {
        throw new Error(orderData.message || "Failed to create order")
      }

      const { order } = orderData

      // 3. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_xxxxxxxx", // Fallback for dev
        amount: order.amount,
        currency: order.currency,
        name: "InvoiceSystem Inc.",
        description: `Payment for Invoice ${invoice.id}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            toast.loading("Verifying payment...", { id: "verify-pay" })
            const verifyRes = await api.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            if (verifyRes.success) {
              toast.success("Payment successful!", { id: "verify-pay" })
              setInvoice((prev: any) => ({ ...prev, status: "Paid", amountDue: 0 }))
            } else {
              toast.error("Payment verification failed", { id: "verify-pay" })
            }
          } catch (err: any) {
            toast.error("Verification error", { id: "verify-pay" })
          }
        },
        prefill: {
          name: invoice.client.name,
          email: invoice.client.email,
          contact: invoice.client.phone,
        },
        theme: {
          color: "#2563eb",
        },
      }

      const paymentObject = new (window as any).Razorpay(options)
      paymentObject.open()
    } catch (err: any) {
      console.error("Payment Error:", err)
      toast.error(err.message || "Something went wrong with the payment")
    } finally {
      setIsPaying(false)
    }
  }

  useEffect(() => {
    if (!idStr) return

    const fetchInvoice = async () => {
      try {
        setLoading(true)
        const data = await api.getPublicInvoice(idStr, token)
        if (data.success && data.invoice) {
          const backendInvoice = data.invoice
          setInvoice({
            id: backendInvoice.invoiceNumber,
            _id: backendInvoice._id,
            status: backendInvoice.status,
            issueDate: new Date(backendInvoice.createdAt).toLocaleDateString(),
            dueDate: new Date(backendInvoice.dueDate).toLocaleDateString(),
            amountDue: backendInvoice.status === "Paid" ? 0 : backendInvoice.total,
            client: {
              name: backendInvoice.clientName,
              email: backendInvoice.email,
              phone: backendInvoice.clientPhone || "",
              companyName: backendInvoice.companyName || "",
              gstNumber: backendInvoice.gstNumber || "",
              address: backendInvoice.clientAddress || "N/A",
              country: backendInvoice.country || ""
            },
            company: {
              name: "InvoiceSystem Inc.",
              email: "hello@invoicesystem.com",
              address: "456 Startup Blvd, Suite 100",
              taxId: "GST-987654321",
            },
            items: (backendInvoice.items || []).map((item: any) => ({
              title: item.itemName || item.title || "Item",
              quantity: item.quantity,
              price: item.price,
              total: item.amount || (item.quantity * item.price)
            })),
            subtotal: backendInvoice.subtotal,
            tax: backendInvoice.taxAmount || 0,
            total: backendInvoice.total,
          })
        }
      } catch (err: any) {
        console.error("Public Invoice API Error:", err)
        setError(err.message || "Failed to load invoice. It might be invalid or you are missing the correct access token.")
      } finally {
        setLoading(false)
      }
    }

    fetchInvoice()
  }, [idStr, token])

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 text-slate-500">Loading invoice data...</div>
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center max-w-md shadow-sm border border-red-100">
          <h2 className="text-xl font-bold mb-2 text-red-700">Access Denied</h2>
          <p className="text-red-600/90">{error}</p>
          <Button variant="outline" className="mt-4 border-red-200 text-red-600 hover:bg-red-50" onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Action Bar (Not visible in print) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-500">Invoice Status:</span>
            <Badge 
              variant={invoice.status === "Paid" ? "success" : invoice.status === "Unpaid" ? "warning" : "destructive"}
              className="text-sm px-3 py-1"
            >
              {invoice.status}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" /> Print
            </Button>
            <Button variant="outline" size="sm" onClick={() => api.downloadInvoice(invoice._id || idStr, invoice.id)}>
              <Download className="w-4 h-4 mr-2" /> PDF
            </Button>
            {invoice.status !== "Paid" && (
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all active:scale-95"
                onClick={handlePayment}
                disabled={isPaying}
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Invoice Document */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden print:shadow-none print:border-none print:m-0">
          
          {/* Header */}
          <div className="p-8 sm:p-12 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                IN
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">{invoice.company.name}</h2>
                <p className="text-sm text-slate-500 mt-1 whitespace-pre-line">{invoice.company.address}</p>
                <p className="text-sm text-slate-500">{invoice.company.email}</p>
                <p className="text-sm text-slate-500">Tax ID: {invoice.company.taxId}</p>
              </div>
            </div>
            
            <div className="text-left sm:text-right">
              <h1 className="text-4xl font-black text-slate-200 uppercase tracking-widest hidden sm:block">INVOICE</h1>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Invoice Number</p>
                  <p className="text-lg font-semibold text-slate-900">{invoice.id}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Issue Date</p>
                    <p className="text-sm font-medium text-slate-900">{invoice.issueDate}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Due Date</p>
                    <p className="text-sm font-medium text-slate-900">{invoice.dueDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="p-8 sm:p-12 bg-slate-50/50 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Billed To</p>
            <h3 className="text-lg font-bold text-slate-900">{invoice.client.companyName ? invoice.client.companyName : invoice.client.name}</h3>
            {invoice.client.companyName && <p className="text-sm text-slate-600 mt-1">{invoice.client.name}</p>}
            <p className="text-sm text-slate-600">{invoice.client.address}</p>
            {invoice.client.country && <p className="text-sm text-slate-600">{invoice.client.country}</p>}
            <p className="text-sm text-slate-600 mt-1">{invoice.client.email}</p>
            {invoice.client.phone && <p className="text-sm text-slate-600">{invoice.client.phone}</p>}
            {invoice.client.gstNumber && <p className="text-sm text-slate-600 mt-1">GST: {invoice.client.gstNumber}</p>}
          </div>

          {/* Items */}
          <div className="p-8 sm:p-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-3 px-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">Service Description</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Qty</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Rate</th>
                    <th className="py-3 px-4 text-sm font-semibold text-slate-600 uppercase tracking-wider text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.map((item: any, idx: number) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-medium text-slate-900">{item.title}</p>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-600">{item.quantity}</td>
                      <td className="py-4 px-4 text-right text-slate-600">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium text-slate-900">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="p-8 sm:p-12 bg-slate-50/50 flex flex-col items-end">
            <div className="w-full sm:w-1/2 md:w-1/3 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Tax</span>
                <span className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.tax)}</span>
              </div>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900 uppercase tracking-wider">Total</span>
                <span className="text-2xl font-black text-blue-600">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.total)}
                </span>
              </div>
              {invoice.status === "Paid" && (
                <div className="flex justify-between items-center text-sm text-green-600 font-medium">
                  <span>Amount Paid</span>
                  <span>-{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.total)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 sm:p-12 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500">Thank you for your business!</p>
            <p className="text-xs text-slate-400 mt-2">
              Payment is due within 15 days. Please make checks payable to InvoiceSystem Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
