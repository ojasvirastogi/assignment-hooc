import { Sidebar } from "@/components/layout/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
        {/* Mobile Header could go here */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 mb-4">
          <div className="text-lg font-semibold sm:hidden">InvoiceSystem</div>
        </header>
        <main className="flex-1 items-start p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </div>
    </div>
  )
}
