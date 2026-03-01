import { NextResponse } from "next/server";
import { resend, EMAIL_FROM, EMAIL_TO } from "@/lib/resend";
import {
  bookingConfirmationHtml,
  type BookingEmailProps,
} from "@/lib/emails/booking-confirmation";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingEmailProps;

    const { name, phone, service, date, time } = body;
    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `New Booking: ${service} — ${name}`,
      html: bookingConfirmationHtml(body),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking email error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
