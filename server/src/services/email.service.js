import { createTransporter } from '../config/email.config.js';
import { config } from '../config/env.config.js';
import { getAdminNotificationTemplate, getAutoReplyTemplate } from '../templates/email.templates.js';


class EmailService {
  constructor() {
    this.transporter = createTransporter();
  }

 
  async sendAdminNotification(data) {
    const { name, email, subject, message } = data;

    const mailOptions = {
      from: `"${name}" <${config.smtp.auth.user}>`,
      to: config.email.contactEmail,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: getAdminNotificationTemplate({ name, email, subject, message }),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Admin notification sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Failed to send admin notification:', error);
      throw new Error('Failed to send admin notification');
    }
  }


  async sendAutoReply(data) {
    if (!config.email.sendAutoReply) {
      console.log('Auto-reply disabled, skipping...');
      return { success: true, skipped: true };
    }

    const { name, email, subject, message } = data;

    const mailOptions = {
      from: `"${config.email.companyName}" <${config.smtp.auth.user}>`,
      to: email,
      subject: `Re: ${subject}`,
      html: getAutoReplyTemplate({ name, message }, config.email.companyName),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Auto-reply sent:', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Failed to send auto-reply:', error);
      // Don't throw error for auto-reply failures
      return { success: false, error: error.message };
    }
  }


  async processContactForm(data) {
    try {
      // Send admin notification (required)
      const adminResult = await this.sendAdminNotification(data);

      // Send auto-reply (optional)
      const autoReplyResult = await this.sendAutoReply(data);

      return {
        success: true,
        adminNotification: adminResult,
        autoReply: autoReplyResult,
      };
    } catch (error) {
      throw error;
    }
  }
}


export default new EmailService();
