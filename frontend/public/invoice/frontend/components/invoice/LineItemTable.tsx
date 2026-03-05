"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { InvoiceFormValues } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function LineItemTable() {
  const { control, register, watch } = useFormContext<InvoiceFormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const watchItems = watch("items") || []

  // Dynamic calculations
  let subtotal = 0
  let totalDiscount = 0
  let totalTax = 0

  watchItems.forEach((item) => {
    const qty = Number(item.quantity) || 0
    const price = Number(item.unitPrice) || 0
    const discountPct = Number(item.discountPercent) || 0
    const taxPct = Number(item.taxPercent) || 0

    const lineSubtotal = qty * price
    const lineDiscount = lineSubtotal * (discountPct / 100)
    const taxableAmount = lineSubtotal - lineDiscount
    const lineTax = taxableAmount * (taxPct / 100)

    subtotal += lineSubtotal
    totalDiscount += lineDiscount
    totalTax += lineTax
  })

  const grandTotal = subtotal - totalDiscount + totalTax

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b">
              <tr>
                <th className="px-4 py-3 w-[25%]">Service / Item</th>
                <th className="px-4 py-3 w-[15%]">Qty</th>
                <th className="px-4 py-3 w-[15%]">Unit Price</th>
                <th className="px-4 py-3 w-[10%]">Discount (%)</th>
                <th className="px-4 py-3 w-[10%]">Tax (%)</th>
                <th className="px-4 py-3 w-[15%] text-right">Total</th>
                <th className="px-4 py-3 w-[10%] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-700">
              {fields.map((field, index) => {
                const itemSubtotal = (watchItems[index]?.quantity || 0) * (watchItems[index]?.unitPrice || 0)
                const itemDiscount = itemSubtotal * ((watchItems[index]?.discountPercent || 0) / 100)
                const itemTax = (itemSubtotal - itemDiscount) * ((watchItems[index]?.taxPercent || 0) / 100)
                const itemTotal = itemSubtotal - itemDiscount + itemTax

                return (
                  <tr key={field.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <Input
                        placeholder="Web Design"
                        {...register(`items.${index}.title` as const)}
                      />
                      <Input
                        placeholder="Description (Optional)"
                        className="mt-2 text-xs"
                        {...register(`items.${index}.description` as const)}
                      />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Input
                        type="number"
                        min="1"
                        {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        {...register(`items.${index}.discountPercent` as const, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        {...register(`items.${index}.taxPercent` as const, { valueAsNumber: true })}
                      />
                    </td>
                    <td className="px-4 py-3 text-right font-medium align-top pt-5">
                      {formatCurrency(itemTotal)}
                    </td>
                    <td className="px-4 py-3 text-center align-top pt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t bg-slate-50">
          <Button
            type="button"
            variant="outline"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() =>
              append({
                title: "",
                description: "",
                quantity: 1,
                unitPrice: 0,
                discountPercent: 0,
                taxPercent: 0,
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <div className="w-full max-w-sm space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-green-600">
            <span>Total Discount</span>
            <span>-{formatCurrency(totalDiscount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Total Tax</span>
            <span className="font-medium">{formatCurrency(totalTax)}</span>
          </div>
          <div className="pt-4 border-t mt-4 flex justify-between font-bold text-lg">
            <span>Grand Total</span>
            <span className="text-blue-600">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
