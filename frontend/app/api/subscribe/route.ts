import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

// Strict Validation Schema for Subscription
const subscriptionSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = subscriptionSchema.safeParse(body);

    // Validation Error handling
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message }, 
        { status: 400 }
      );
    }

    const { email } = result.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // The unsubscription link can be a placeholder for now or point to a specific route
    const unsubscribeLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(email)}`;

    await transporter.sendMail({
      from: `"HoocAi" <${process.env.SMTP_USER}>`,
      to: email, // Send explicitly to the user who subscribed
      subject: `Welcome to HoocAi Newsletter!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #1a1a1a;">Thank you for subscribing to HoocAi! 🎉</h2>
          <p style="color: #4a4a4a; line-height: 1.6;">
            We're thrilled to have you on board. You'll now receive our latest updates, insights, and news right in your inbox.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #888; text-align: center;">
            <p>If you no longer wish to receive these emails, you can <a href="${unsubscribeLink}" style="color: #d32f2f; text-decoration: underline;">unsubscribe here</a>.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Successfully subscribed!" }, { status: 200 });

  } catch (error: any) {
    console.error("Subscription API Error:", error);
    return NextResponse.json(
      { error: "Server error: Failed to process subscription" }, 
      { status: 500 }
    );
  }
}
