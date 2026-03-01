export interface BookingEmailProps {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

/** Plain-HTML email — no extra dependencies required. */
export function bookingConfirmationHtml(props: BookingEmailProps): string {
  const { name, phone, service, date, time, notes } = props;

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f7fa">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden">
        <!-- Header -->
        <tr>
          <td style="background:#1d4ed8;padding:32px;text-align:center">
            <h1 style="margin:0;color:#ffffff;font-size:24px">New Booking Request</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.5">
              A new appointment has been requested through the website.
            </p>
            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:140px">Name</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb">Phone</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(phone)}</td>
              </tr>
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb">Service</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(service)}</td>
              </tr>
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb">Date</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(date)}</td>
              </tr>
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb">Time</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(time)}</td>
              </tr>
              ${
                notes.trim()
                  ? `<tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;vertical-align:top">Notes</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(notes)}</td>
              </tr>`
                  : ""
              }
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px 32px;background:#f9fafb;text-align:center;color:#6b7280;font-size:13px">
            The Eye Zone &middot; 29 Fife Avenue, Harare &middot; +263 24 2250335
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
