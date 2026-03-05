"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { InvoiceFormValues, invoiceSchema } from "@/lib/schema"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineItemTable } from "@/components/invoice/LineItemTable"
import toast from "react-hot-toast"

export default function CreateInvoicePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  const methods = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema as any),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      companyName: "",
      gstNumber: "",
      billingAddress: "",
      country: "",
      currency: "USD",
      invoiceDate: new Date(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      paymentTerms: "Net 15",
      notes: "",
      terms: "",
      items: [
        {
          title: "",
          description: "",
          quantity: 1,
          unitPrice: 0,
          discountPercent: 0,
          taxPercent: 0,
        },
      ],
    } as any,
  })

  // Fixed typescript error by matching any since we manually pass the payload
  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      // Ensure items has proper mapped shape for backend
      const payload = {
        ...data,
        email: data.clientEmail, // Match backend payload
      }
      const response = await api.createInvoice(payload as any)
      
      const invoiceId = response.invoice._id;
      const invoiceNumber = response.invoiceNumber;
      
      // Attempt to download the PDF automatically
      try {
        await api.downloadInvoice(invoiceId, invoiceNumber);
      } catch (downloadErr) {
        console.error("Failed to auto-download PDF:", downloadErr);
      }
      
      toast.success(`Invoice ${invoiceNumber} created and emailed to ${payload.email}!`);

      router.push("/admin/invoices")
    } catch (error: any) {
      console.error(error)
      toast.error(`Error creating invoice: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-8 pb-12 pt-8 px-4"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Create New Invoice</h1>
        <p className="text-slate-500 mt-2 text-lg">Fill in the details below to generate a new invoice.</p>
      </motion.div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="h-full">
              <Card className="shadow-xl bg-white/80 backdrop-blur-md border-white/20 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Who is this invoice for?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Client Name */}
                <div className="grid gap-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input id="clientName" {...methods.register("clientName")} placeholder="John Doe" />
                  {methods.formState.errors.clientName && (
                    <p className="text-xs text-red-500">{methods.formState.errors.clientName.message}</p>
                  )}
                </div>
                
                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="clientEmail">Email *</Label>
                    <Input id="clientEmail" type="email" {...methods.register("clientEmail")} placeholder="john@example.com" />
                    {methods.formState.errors.clientEmail && (
                        <p className="text-xs text-red-500">{methods.formState.errors.clientEmail.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="clientPhone">Phone</Label>
                    <Input id="clientPhone" {...methods.register("clientPhone")} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                {/* Company & GST */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" {...methods.register("companyName")} placeholder="Acme Inc." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gstNumber">GST/Tax Number</Label>
                    <Input id="gstNumber" {...methods.register("gstNumber")} placeholder="GST123456" />
                  </div>
                </div>

                {/* Address */}
                <div className="grid gap-2">
                  <Label htmlFor="billingAddress">Billing Address *</Label>
                  <Input id="billingAddress" {...methods.register("billingAddress")} placeholder="123 Street Name, City, Zip" />
                  {methods.formState.errors.billingAddress && (
                    <p className="text-xs text-red-500">{methods.formState.errors.billingAddress.message}</p>
                  )}
                </div>
                
                {/* Country & Currency */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" {...methods.register("country")} placeholder="United States" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" {...methods.register("currency")} placeholder="USD" />
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <Card className="shadow-xl bg-white/80 backdrop-blur-md border-white/20 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle>Invoice Metadata</CardTitle>
                <CardDescription>Dates, terms, and auto-generated data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invoiceDate">Invoice Date *</Label>
                    <Input 
                      id="invoiceDate" 
                      type="date" 
                      // Convert Date object to YYYY-MM-DD for the input value
                      defaultValue={new Date().toISOString().split('T')[0]}
                      {...methods.register("invoiceDate", { valueAsDate: true })} 
                    />
                    {methods.formState.errors.invoiceDate && (
                      <p className="text-xs text-red-500">{methods.formState.errors.invoiceDate.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input 
                      id="dueDate" 
                      type="date" 
                      {...methods.register("dueDate", { valueAsDate: true })} 
                    />
                    {methods.formState.errors.dueDate && (
                      <p className="text-xs text-red-500">{methods.formState.errors.dueDate.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="paymentTerms">Payment Terms *</Label>
                  <select
                    id="paymentTerms"
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    {...methods.register("paymentTerms")}
                  >
                    <option value="Net 7">Net 7</option>
                    <option value="Net 15">Net 15</option>
                    <option value="Net 30">Net 30</option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes to Client</Label>
                  <textarea 
                    id="notes"
                    className="flex min-h-[60px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    placeholder="Thank you for your business!"
                    {...methods.register("notes")}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <textarea 
                    id="terms"
                    className="flex min-h-[60px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    placeholder="Late payment is subject to 5% fee..."
                    {...methods.register("terms")}
                  />
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">Line Items</h3>
            <LineItemTable />
            {methods.formState.errors.items?.root && (
              <p className="text-sm text-red-500 mt-2">{methods.formState.errors.items.root.message}</p>
            )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" className="hover:bg-slate-100 transition-colors">Save as Draft</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
              {isSubmitting ? "Generating..." : "Generate Invoice & Send"}
            </Button>
          </motion.div>
        </form>
      </FormProvider>
    </motion.div>
  )
}