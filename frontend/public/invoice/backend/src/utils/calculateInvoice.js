export const calculateInvoice = (items) => {
  let subtotal = 0;
  let totalDiscount = 0;
  let totalTax = 0;

  const calculatedItems = items.map((item) => {
    const lineSubtotal = Number((item.quantity * item.unitPrice).toFixed(2));

    const lineDiscount = Number(
      (lineSubtotal * (item.discountPercent / 100)).toFixed(2)
    );

    const taxableAmount = lineSubtotal - lineDiscount;

    const lineTax = Number(
      (taxableAmount * (item.taxPercent / 100)).toFixed(2)
    );

    const lineTotal = Number((taxableAmount + lineTax).toFixed(2));

    subtotal += lineSubtotal;
    totalDiscount += lineDiscount;
    totalTax += lineTax;

    return {
      ...item,
      lineSubtotal,
      lineDiscount,
      lineTax,
      lineTotal,
    };
  });

  const total = Number(
    (subtotal - totalDiscount + totalTax).toFixed(2)
  );

  return {
    calculatedItems,
    subtotal: Number(subtotal.toFixed(2)),
    totalDiscount: Number(totalDiscount.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    total,
  };
};