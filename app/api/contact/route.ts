import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend";
import {
  contactNotificationHtml,
  type ContactEmailProps,
} from "@/lib/emails/contact-notification";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactEmailProps;

    const { name, email, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: `Contact Form: ${name}`,
      html: contactNotificationHtml(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
