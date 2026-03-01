import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error(
        "RESEND_API_KEY is not set. Add it to your environment variables.",
      );
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

/**
 * Default sender address — uses Resend's onboarding domain out of the box.
 * Once you verify your own domain in the Resend dashboard, update this to
 * something like "The Eye Zone <bookings@theeyezone.co.zw>".
 */
export const EMAIL_FROM = "The Eye Zone <onboarding@resend.dev>";

/**
 * Where booking / contact notifications are delivered.
 * Change this to the clinic's real inbox once ready.
 */
export const EMAIL_TO = "avdingiswayo54@gmail.com";
