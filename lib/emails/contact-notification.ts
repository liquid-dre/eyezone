export interface ContactEmailProps {
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

/** Plain-HTML email — no extra dependencies required. */
export function contactNotificationHtml(props: ContactEmailProps): string {
  const { name, email, preferredDate, preferredTime, message } = props;

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
            <h1 style="margin:0;color:#ffffff;font-size:24px">New Contact Message</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.5">
              Someone reached out through the website contact form.
            </p>
            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;width:140px">Name</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb">Email</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">
                  <a href="mailto:${escapeHtml(email)}" style="color:#1d4ed8">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${
                preferredDate
                  ? `<tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb">Preferred Date</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(preferredDate)}</td>
              </tr>`
                  : ""
              }
              ${
                preferredTime
                  ? `<tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb">Preferred Time</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb">${escapeHtml(preferredTime)}</td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="font-weight:600;color:#374151;border-bottom:1px solid #e5e7eb;vertical-align:top">Message</td>
                <td style="color:#374151;border-bottom:1px solid #e5e7eb;white-space:pre-line">${escapeHtml(message)}</td>
              </tr>
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
