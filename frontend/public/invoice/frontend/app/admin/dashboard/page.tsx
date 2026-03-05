"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, FileText, ArrowUpRight, AlertCircle, Clock, TrendingUp, Download, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { api } from "@/lib/api"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardPage() {
  const [summary, setSummary] = useState({ totalRevenue: 0, pendingAmount: 0, overdueAmount: 0 })
  const [statusData, setStatusData] = useState<any[]>([])
  const [recentInvoices, setRecentInvoices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sum, stat, invData] = await Promise.all([
          api.getDashboardSummary(),
          api.getStatusDistribution(),
          api.getAllInvoices()
        ])
        setSummary(sum)
        
        setStatusData(stat.map((item: any) => ({ name: item._id, value: item.count })))
        
        // Get the latest 4 invoices for the recent invoices table
        if (invData && invData.invoices) {
          setRecentInvoices(invData.invoices.slice(0, 4))
        }
      } catch (error: any) {
        console.error("Failed to fetch dashboard data:", error)
        toast.error(error.message || "Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="flex flex-col gap-8 bg-[#f8fafc] min-h-screen pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your invoicing activity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-6">
            <CardTitle className="text-sm font-medium text-slate-500">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
              <span className="text-blue-500 font-semibold text-lg">₹</span>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(summary.totalRevenue)}</div>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              All time paid invoices
            </p>
          </CardContent>
        </Card>
        
        {/* Pending */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-6">
            <CardTitle className="text-sm font-medium text-slate-500">Pending</CardTitle>
            <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(summary.pendingAmount)}</div>
            <p className="text-xs text-slate-500 mt-2 font-medium opacity-0">Awaiting payment</p>
          </CardContent>
        </Card>

        {/* Overdue */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-6">
            <CardTitle className="text-sm font-medium text-slate-500">Overdue</CardTitle>
            <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-3xl font-bold text-slate-900">{formatCurrency(summary.overdueAmount)}</div>
             <p className="text-xs text-slate-500 mt-2 font-medium opacity-0">Past due date</p>
          </CardContent>
        </Card>

        {/* Total Invoices (Acting as 4th card "Paid This Month") */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5 px-6">
            <CardTitle className="text-sm font-medium text-slate-500">Total Invoices</CardTitle>
            <div className="h-8 w-8 rounded-md bg-blue-50 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-3xl font-bold text-slate-900">
              {statusData.reduce((acc, curr) => acc + curr.value, 0)}
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">Generated</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices Table */}
      <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden mt-4">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Recent Invoices</h2>
          <Link href="/admin/invoices" className="text-sm text-blue-600 font-medium hover:underline flex items-center">
            View all <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-[180px] text-slate-500 font-medium h-12 px-6">Invoice</TableHead>
              <TableHead className="text-slate-500 font-medium h-12 px-6">Client</TableHead>
              <TableHead className="text-slate-500 font-medium h-12 px-6">Amount</TableHead>
                <TableHead className="text-slate-500 font-medium h-12 px-6">Status</TableHead>
                <TableHead className="text-slate-500 font-medium h-12 px-6">Due Date</TableHead>
                <TableHead className="text-slate-500 font-medium h-12 px-6 text-right">Actions</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {recentInvoices.length > 0 ? (
              recentInvoices.map((invoice: any) => (
                <TableRow key={invoice._id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-700 px-6 py-4">
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
                  No recent invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
