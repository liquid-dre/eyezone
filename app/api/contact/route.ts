import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend";
import {
  contactNotificationHtml,
  type ContactEmailProps,
} from "@/lib/emails/contact-notification";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Please wait a minute before sending another request." },
        { status: 429 },
      );
    }

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
