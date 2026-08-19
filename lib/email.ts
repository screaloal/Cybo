import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  username: string,
  token: string
) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: 'Cyboeta <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your Cyboeta account',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="background:#000;margin:0;padding:0;font-family:'DM Sans',sans-serif;color:#f0f6ff;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#080d1a;border:1px solid rgba(96,165,250,0.15);border-radius:20px;padding:48px 40px;">
                
                <!-- Logo text -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <div style="font-size:24px;font-weight:800;letter-spacing:-0.02em;color:#f0f6ff;">
                      Cybo<span style="color:rgba(96,165,250,0.85);">eta</span>
                    </div>
                    <div style="font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(240,246,255,0.25);margin-top:4px;">
                      Where Secure Minds Meet
                    </div>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:32px;">
                    <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
                  </td>
                </tr>

                <!-- Greeting -->
                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0;font-size:15px;color:rgba(240,246,255,0.7);font-weight:300;line-height:1.7;">
                      Welcome, <strong style="color:#f0f6ff;font-weight:600;">${username}</strong>.
                    </p>
                    <p style="margin:12px 0 0;font-size:14px;color:rgba(240,246,255,0.45);font-weight:300;line-height:1.7;">
                      Your account has been created. Verify your email address to activate it and gain access to the Cyboeta community.
                    </p>
                  </td>
                </tr>

                <!-- Button -->
                <tr>
                  <td align="center" style="padding:32px 0;">
                    <a href="${verifyUrl}" 
                       style="display:inline-block;padding:14px 36px;background:transparent;border:1px solid rgba(96,165,250,0.4);border-radius:10px;color:#f0f6ff;font-size:14px;font-weight:500;text-decoration:none;letter-spacing:0.04em;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>

                <!-- Note -->
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:rgba(240,246,255,0.25);line-height:1.7;text-align:center;">
                      This link expires in 24 hours. If you did not create a Cyboeta account, ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-top:32px;">
                    <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding-top:24px;">
                    <p style="margin:0;font-size:11px;color:rgba(240,246,255,0.15);letter-spacing:0.03em;">
                      © 2026 Cyboeta. All rights reserved.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });
}
