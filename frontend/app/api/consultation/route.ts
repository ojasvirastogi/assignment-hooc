import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

const bookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().optional(),
  date: z.number().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const data = result.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${data.name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `Booking: ${data.name} for ${data.time}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>New Consultation Scheduled</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Date:</strong> Day ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Project Info:</strong> ${data.message || "No project info provided"}</p>
        </div>
      `,
    });

    // API sirf JSON return karega
    return NextResponse.json({ message: "Booking confirmed successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: "Failed to confirm booking" }, { status: 500 });
  }
}