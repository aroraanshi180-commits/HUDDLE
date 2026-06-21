const resetPasswordTemplate = (name, resetUrl) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>

  <body style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial, Helvetica, sans-serif;
  ">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 20px;">

          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background:#ffffff;
              border-radius:16px;
              overflow:hidden;
              box-shadow:0 8px 25px rgba(0,0,0,0.08);
            "
          >

            <tr>
              <td
                align="center"
                style="
                  background:linear-gradient(135deg,#4f46e5,#7c3aed);
                  color:white;
                  padding:40px;
                "
              >
                <h1 style="margin:0;font-size:28px;">
                  CRM Task Manager
                </h1>

                <p style="margin-top:10px;font-size:16px;">
                  Password Reset Request
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:40px;">
                <h2 style="color:#0f172a;">
                  Hello ${name},
                </h2>

                <p
                  style="
                    color:#475569;
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  We received a request to reset your password.
                  Click the button below to create a new password.
                </p>

                <div style="text-align:center;margin:35px 0;">
                  <a
                    href="${resetUrl}"
                    style="
                      background:#4f46e5;
                      color:white;
                      text-decoration:none;
                      padding:14px 30px;
                      border-radius:10px;
                      font-size:16px;
                      font-weight:bold;
                      display:inline-block;
                    "
                  >
                    Reset Password
                  </a>
                </div>

                <p
                  style="
                    color:#64748b;
                    font-size:14px;
                    line-height:1.7;
                  "
                >
                  This link will expire in
                  <strong>1 hour</strong>.
                </p>

                <p
                  style="
                    color:#64748b;
                    font-size:14px;
                    line-height:1.7;
                  "
                >
                  If you didn't request a password reset,
                  you can safely ignore this email.
                </p>

                <hr
                  style="
                    border:none;
                    border-top:1px solid #e2e8f0;
                    margin:30px 0;
                  "
                />

                <p
                  style="
                    color:#94a3b8;
                    font-size:12px;
                    word-break:break-all;
                  "
                >  
                </p>
              </td>
            </tr>

            <tr>
              <td
                align="center"
                style="
                  background:#f8fafc;
                  padding:20px;
                  color:#64748b;
                  font-size:13px;
                "
              >
                © 2025 CRM Task Manager
                <br />
                Secure Account Recovery
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};

module.exports = resetPasswordTemplate;