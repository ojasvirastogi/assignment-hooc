import { InvoiceFormValues } from "./schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const ADMIN_SECRET = "supersecret123"; // Should ideally come from env, but hardcoding as per current setup

export const api = {
  // Invoice endpoints
  createInvoice: async (data: InvoiceFormValues) => {
    const res = await fetch(`${API_BASE_URL}/invoice/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create invoice");
    }
    return res.json();
  },

  getAllInvoices: async () => {
    const res = await fetch(`${API_BASE_URL}/invoice/`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error("Failed to fetch invoices");
    return res.json();
  },

  downloadInvoice: async (id: string, filename: string) => {
    const res = await fetch(`${API_BASE_URL}/invoice/download/${id}`);
    if (!res.ok) throw new Error("Failed to download PDF");
    
    // Create a blob from the response and trigger download
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  sendInvoiceEmail: async (id: string) => {
    const res = await fetch(`${API_BASE_URL}/invoice/send-email/${id}`, {
      method: "POST"
    });
    if (!res.ok) throw new Error("Failed to send email");
    return res.json();
  },

  // Analytics endpoints
  getDashboardSummary: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/summary`, { 
      cache: 'no-store',
      headers: { "x-admin-secret": ADMIN_SECRET }
    });
    if (!res.ok) throw new Error("Failed to fetch summary");
    return res.json();
  },

  getMonthlyRevenue: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/monthly-revenue`, { 
      cache: 'no-store',
      headers: { "x-admin-secret": ADMIN_SECRET }
    });
    if (!res.ok) throw new Error("Failed to fetch revenue");
    return res.json();
  },

  getStatusDistribution: async () => {
    const res = await fetch(`${API_BASE_URL}/analytics/status-distribution`, { 
      cache: 'no-store',
      headers: { "x-admin-secret": ADMIN_SECRET }
    });
    if (!res.ok) throw new Error("Failed to fetch status distribution");
    return res.json();
  },

  // Public endpoint
  getPublicInvoice: async (id: string, token: string) => {
    // Note: Public routes are mapped directly on the root in app.js, not under /api/
    // app.use("/", publicRoutes); -> GET /invoice/:id
    const baseUrl = API_BASE_URL.replace('/api', '');
    const res = await fetch(`${baseUrl}/invoice/${id}?token=${token}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error("Failed to fetch public invoice or unauthorized");
    }
    return res.json();
  },

  // Payment endpoints
  createPaymentOrder: async (invoiceId: string) => {
    const res = await fetch(`${API_BASE_URL}/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId }),
    });
    if (!res.ok) throw new Error("Failed to create payment order");
    return res.json();
  },

  verifyPayment: async (paymentData: any) => {
    const res = await fetch(`${API_BASE_URL}/payment/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
    if (!res.ok) throw new Error("Payment verification failed");
    return res.json();
  },
};
