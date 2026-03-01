import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

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
export const EMAIL_TO = "info@theeyezone.co.zw";
