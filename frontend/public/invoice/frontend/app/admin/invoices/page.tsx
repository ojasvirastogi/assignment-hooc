"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, Download, Mail } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { api } from "@/lib/api"
import toast from "react-hot-toast"

export default function InvoicesPage() {
  const [search, setSearch] = useState("")
  const [invoices, setInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchInvoices = async () => {
    try {
      const data = await api.getAllInvoices()
      setInvoices(data.invoices || [])
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || "Failed to load invoices")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) || 
    inv.clientName?.toLowerCase().includes(search.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="flex flex-col gap-6 bg-[#f8fafc] min-h-screen pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500 mt-1">{invoices.length} total invoices</p>
        </div>
        <Link href="/admin/create">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-medium shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> New Invoice
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search invoices..."
            className="pl-9 bg-white border-slate-200 rounded-lg shadow-sm focus-visible:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="bg-white border-slate-200 rounded-lg shadow-sm text-slate-600 font-medium">
          <Filter className="mr-2 h-4 w-4 text-slate-400" /> Filter
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden mt-2">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-200">
              <TableHead className="w-[180px] text-slate-500 font-medium h-12 px-6">Invoice</TableHead>
              <TableHead className="text-slate-500 font-medium h-12 px-6">Client</TableHead>
              <TableHead className="text-slate-500 font-medium h-12 px-6">Amount</TableHead>
              <TableHead className="text-slate-500 font-medium h-12 px-6">Status</TableHead>
              <TableHead className="text-slate-500 font-medium h-12 px-6">Due Date</TableHead>
              <TableHead className="text-slate-500 font-medium h-12 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  Loading invoices...
                </TableCell>
              </TableRow>
            ) : filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice: any) => (
                <TableRow key={invoice._id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-blue-600 px-6 py-4">
                     {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">{invoice.clientName}</span>
                      <span className="text-xs text-slate-500">{invoice.clientEmail || 'Client'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-slate-900">
                    {formatCurrency(invoice.total)}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={`
                        border-0 px-2.5 py-1 text-xs font-medium rounded-full
                        ${invoice.status === "Paid" ? "bg-slate-100 text-slate-700" : 
                          invoice.status === "Overdue" ? "bg-red-50 text-red-600" : 
                          invoice.status === "Pending" ? "bg-amber-50 text-amber-600" : 
                          "bg-slate-100 text-slate-600"}
                      `}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-500 text-sm">
                    {invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : new Date(invoice.createdAt).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-500 text-sm">
                    {new Date(invoice.createdAt).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-slate-500 hover:text-blue-600"
                      title="Download PDF"
                      onClick={() => api.downloadInvoice(invoice._id, invoice.invoiceNumber)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-slate-500 hover:text-blue-600"
                      title="Send Email"
                      onClick={async () => {
                        try {
                          toast.loading("Sending email...", { id: "email-send" });
                          await api.sendInvoiceEmail(invoice._id);
                          toast.success("Email sent successfully!", { id: "email-send" });
                          fetchInvoices();
                        } catch (error: any) {
                          toast.error(error.message || "Failed to send email", { id: "email-send" });
                        }
                      }}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
