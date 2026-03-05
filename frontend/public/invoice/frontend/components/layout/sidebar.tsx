import Link from "next/link"
import { LayoutDashboard, FileText, Settings, Plus } from "lucide-react"

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-white sm:flex">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-blue-600">
          <div className="h-8 w-8 rounded bg-blue-600 text-white flex items-center justify-center">
            <span className="text-sm font-bold">IN</span>
          </div>
          InvoiceSystem
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 transition-all hover:text-slate-900 hover:bg-slate-100"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/invoices"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 transition-all hover:text-slate-900 hover:bg-slate-100"
          >
            <FileText className="h-4 w-4" />
            Invoices
          </Link>
          <div className="mt-4 mb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Quick Actions
          </div>
          <Link
            href="/admin/create"
            className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2 text-blue-600 transition-all hover:bg-blue-100"
          >
            <Plus className="h-4 w-4" />
            Create Invoice
          </Link>
        </nav>
      </div>
      <div className="border-t p-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 transition-all hover:text-slate-900 hover:bg-slate-100"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  )
}
