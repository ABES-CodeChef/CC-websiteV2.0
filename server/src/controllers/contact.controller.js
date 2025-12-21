import emailService from '../services/email.service.js';

class ContactController {
 
  async submitContactForm(req, res) {
    const { name, email, subject, message } = req.body;

    try {
      await emailService.processContactForm({
        name,
        email,
        subject,
        message,
      });

      res.status(200).json({
        success: true,
        message: 'Message sent successfully! We will get back to you soon.',
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      });
    }
  }
}

export default new ContactController();
