import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    /* ── Validation ── */
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    /* ── Save to Neon DB ── */
    await sql`
      INSERT INTO contacts (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `;

    /* ── Send email notification via Brevo ── */
    const brevoApiKey  = process.env.BREVO_API_KEY;
    const senderEmail  = process.env.BREVO_SENDER_EMAIL;
    const senderName   = process.env.BREVO_SENDER_NAME ?? "Portfolio Contact Form";

    if (brevoApiKey && senderEmail) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: "kangsheng_quek@yahoo.com.sg", name: "Quek Kang Sheng" }],
          subject: `📩 New Portfolio Message from ${name}`,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
              <h2 style="color: #D4A853; margin-bottom: 8px;">New Contact Form Submission</h2>
              <p style="color: #666; margin-bottom: 24px; font-size: 14px;">Someone reached out via your portfolio website.</p>

              <div style="background: #fff; border-radius: 6px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #D4A853;">
                <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">From</p>
                <p style="margin: 0; font-size: 16px; font-weight: bold; color: #222;">${name}</p>
                <p style="margin: 4px 0 0; color: #555;">${email}</p>
              </div>

              <div style="background: #fff; border-radius: 6px; padding: 20px; border-left: 4px solid #D4A853;">
                <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999;">Message</p>
                <p style="margin: 0; color: #333; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>

              <p style="margin-top: 24px; font-size: 12px; color: #aaa; text-align: center;">
                Sent from your portfolio at quekkangsheng.vercel.app
              </p>
            </div>
          `,
        }),
      });
    }

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 }
    );

  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}