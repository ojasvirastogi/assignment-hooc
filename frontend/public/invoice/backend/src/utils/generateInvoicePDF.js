import puppeteer from "puppeteer";

export const generateInvoicePDF = async (invoice) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: invoice.currency || 'USD',
    }).format(amount || 0);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";
    return new Date(dateValue).toISOString().split('T')[0];
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            color: #334155;
            margin: 0;
            padding: 40px;
            background-color: #f8fafc;
            -webkit-print-color-adjust: exact;
          }
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 40px;
            background: white;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-bottom: 24px;
            border-bottom: 1px solid #e2e8f0;
          }
          .company-info { display: flex; align-items: center; gap: 16px; }
          .logo {
            width: 48px; height: 48px; border-radius: 12px; background: #2563eb;
            display: flex; align-items: center; justify-content: center; color: white;
          }
          .logo svg { width: 24px; height: 24px; }
          .company-name { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0; }
          .company-tagline { font-size: 14px; color: #64748b; margin: 0; }
          .invoice-details { text-align: right; }
          .invoice-number { font-size: 24px; font-weight: 800; color: #0f172a; margin: 0; }
          .invoice-status { font-size: 14px; font-weight: 600; color: #0f172a; margin-top: 4px; }
          .meta-section {
            display: flex; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid #e2e8f0;
          }
          .bill-to { flex: 1; }
          .bill-to p { margin: 2px 0; font-size: 14px; color: #64748b; }
          .bill-to .title { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
          .bill-to .client-name { font-size: 16px; font-weight: 600; color: #0f172a; margin-bottom: 4px; }
          .dates { display: grid; grid-template-columns: auto auto; grid-gap: 8px 16px; font-size: 14px; align-items: center; }
          .dates .label { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; text-align: right; margin: 0; }
          .dates .value { color: #0f172a; text-align: right; margin: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 24px; }
          th { text-align: right; font-size: 13px; font-weight: 600; color: #64748b; padding: 12px; border-bottom: 1px solid #e2e8f0; }
          th:first-child { text-align: left; }
          td { text-align: right; padding: 16px 12px; border-bottom: 1px solid #f8fafc; font-size: 14px; vertical-align: top; }
          td:first-child { text-align: left; }
          .item-name { font-weight: 600; color: #0f172a; margin: 0 0 4px 0; }
          .item-desc { font-size: 13px; color: #94a3b8; margin: 0; }
          .totals-section { display: flex; justify-content: space-between; padding-top: 24px; }
          .notes { flex: 1; max-width: 50%; }
          .notes h4 { font-size: 13px; font-weight: 600; color: #64748b; margin: 0 0 4px 0; }
          .notes p { font-size: 13px; color: #94a3b8; margin: 0 0 16px 0; line-height: 1.5; }
          .totals-table { width: 300px; margin-left: auto; border-collapse: collapse; margin-top: 0; }
          .totals-table td { padding: 8px 12px; border: none; font-size: 14px; text-align: right; color: #64748b; }
          .totals-table td:first-child { text-align: left; }
          .totals-table tr.grand-total td { 
            font-size: 18px; font-weight: 700; color: #0f172a; border-top: 1px solid #e2e8f0; padding-top: 16px; 
          }
          .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          
          <div class="header">
            <div class="company-info">
              <div class="logo">
                <svg xmlns="http://www.w3.org/-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div>
                <p class="company-name">InvoiceHub</p>
                <p class="company-tagline">Professional Invoicing</p>
              </div>
            </div>
            <div class="invoice-details">
              <p class="invoice-number">${invoice.invoiceNumber}</p>
              <p class="invoice-status">${invoice.status}</p>
            </div>
          </div>

            <div class="meta-section">
            <div class="bill-to border-header">
              <p class="title">BILL TO</p>
              <p class="client-name">${invoice.companyName ? invoice.companyName : invoice.clientName}</p>
              ${invoice.companyName ? `<p>${invoice.clientName}</p>` : ''}
              <p>${invoice.clientEmail || invoice.email}</p>
              ${invoice.clientPhone ? `<p>${invoice.clientPhone}</p>` : ''}
              ${invoice.gstNumber ? `<p>GST: ${invoice.gstNumber}</p>` : ''}
              ${invoice.clientAddress ? `<p>${invoice.clientAddress}</p>` : ''}
              ${invoice.country ? `<p>${invoice.country}</p>` : ''}
            </div>
            
            <div class="dates">
              <div class="label-value-pair">
                 <p class="label">INVOICE DATE</p>
                 <p class="value">${formatDate(invoice.createdAt || new Date())}</p>
              </div>
              
              <div class="label-value-pair">
                 <p class="label">DUE DATE</p>
                 <p class="value">${formatDate(invoice.dueDate)}</p>
              </div>
              
              <div class="label-value-pair">
                 <p class="label">CURRENCY</p>
                 <p class="value">${invoice.currency || 'USD'}</p>
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${(invoice.items || []).map(item => `
                <tr>
                  <td>
                    <p class="item-name">${item.title || item.itemName || 'Item'}</p>
                    ${item.description ? `<p class="item-desc">${item.description}</p>` : ''}
                  </td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.unitPrice || item.price)}</td>
                  <td>${formatCurrency(item.lineTax || 0)}</td>
                  <td style="color:#0f172a;font-weight:600;">${formatCurrency(item.lineTotal || item.amount)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals-section">
            <div class="notes">
              ${invoice.paymentTerms ? `<p style="font-weight:600; font-size:13px; color:#0f172a;">Payment Terms: ${invoice.paymentTerms}</p>` : ''}
              ${invoice.notes ? `<h4>Notes</h4><p>${invoice.notes}</p>` : `<h4>Notes</h4><p>Thank you for your business!</p>`}
              ${invoice.terms ? `<h4>Terms & Conditions</h4><p>${invoice.terms}</p>` : `<h4>Terms & Conditions</h4><p>Payment due within 15 days.</p>`}
            </div>
            <div>
              <table class="totals-table">
                <tr>
                  <td>Subtotal</td>
                  <td>${formatCurrency(invoice.subtotal)}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>-${formatCurrency(invoice.discount)}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>${formatCurrency(invoice.tax)}</td>
                </tr>
                <tr class="grand-total">
                  <td>Grand Total</td>
                  <td>${formatCurrency(invoice.total)}</td>
                </tr>
              </table>
            </div>
          </div>

        </div>
        <div class="footer">
          Powered by InvoiceHub • Secure Invoice System
        </div>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  await browser.close();

  return pdf;
};