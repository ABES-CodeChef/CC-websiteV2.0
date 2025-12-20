/**
 * Email template styles
 */
const emailStyles = `
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
  }
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 10px 10px 0 0;
    text-align: center;
  }
  .content {
    background: white;
    padding: 30px;
    border-radius: 0 0 10px 10px;
  }
  .field {
    margin-bottom: 20px;
  }
  .label {
    font-weight: bold;
    color: #667eea;
    display: block;
    margin-bottom: 5px;
  }
  .value {
    color: #333;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
  }
  .message-box {
    background-color: #f5f5f5;
    padding: 15px;
    border-left: 4px solid #667eea;
    border-radius: 5px;
    margin-top: 10px;
  }
  .footer {
    text-align: center;
    margin-top: 20px;
    color: #666;
    font-size: 14px;
  }
`;


export const getAdminNotificationTemplate = ({ name, email, subject, message }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${emailStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <div class="value">${escapeHtml(email)}</div>
            </div>
            <div class="field">
              <span class="label">Subject:</span>
              <div class="value">${escapeHtml(subject)}</div>
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};


export const getAutoReplyTemplate = ({ name, message }, companyName) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${emailStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Contacting Us!</h2>
          </div>
          <div class="content">
            <p>Hi ${escapeHtml(name)},</p>
            <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
            <p><strong>Your Message:</strong></p>
            <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #667eea; border-radius: 5px;">
              ${escapeHtml(message).replace(/\n/g, '<br>')}
            </p>
            <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
            <p>Best regards,<br>${escapeHtml(companyName)}</p>
          </div>
          <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};


const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
};
